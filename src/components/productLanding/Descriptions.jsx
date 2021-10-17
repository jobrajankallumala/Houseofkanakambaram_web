import React, { Component } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { addToCart, addToWishList } from '../../js/actions';
import CartTtemsStorage from '../../general/localStorage/CartTtemsStorage';
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';
import CartService from '../../general/services/CartService';
import history from '../../general/lib/history';
import Reviews from './Review';

const mapStateToProps = state => ({
    bag: state.bag,
    access_token: state.access_token,
})
function mapDispatchToProps(dispatch) {
    return {
        addToCart: val => dispatch(addToCart(val))
    };
}
class Descriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
        this.increaseQuantity = this.increaseQuantity.bind(this);
    }

    buyNow(item) {
        if (!this.findIsCart()) {
            if (this.props.access_token) {
                this.postCart({ product_id: this.props.data.id, quantity: this.state.quantity }, true)
            } else {
                this.postLocalCart({ product_id: this.props.data.id, quantity: this.state.quantity }, true);
            }
        } else {
            history.push('/checkout')
        }
    }

    increaseQuantity() {
        if (this.state.quantity < this.props.data.stock) {
            this.setState({ quantity: this.state.quantity + 1 })
            if (this.findIsCart()) {
                this.changeQuantity(this.state.quantity + 1)
            }
        } else {
            alert("Only " + this.props.data.stock + " quantity is available!")
        }
    }
    decreaseQuantity() {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
            if (this.findIsCart()) {
                this.changeQuantity(this.state.quantity - 1);
            }
        }
    }
    changeQuantity(quantity) {
        if (this.props.access_token) {
            this.postCart({ product_id: this.props.data.id, quantity: quantity })
        } else {
            this.postLocalCart({ product_id: this.props.data.id, quantity: quantity });
        }
    }
    findIsCart() {
        let cartItems = this.props.bag;

        if (cartItems.products) {
            let exItem = cartItems.products.find(e => e.product_id == this.props.data.id);

            if (exItem == undefined) {
                return false
            } else {
                return true
            }

        }
        return false

    }

    async postLocalCart(item, proceed = false) {
        let response = await CartService.addLocalCart(this.props.bag, this.props.data, item.quantity);
        this.props.addToCart(response);
        if (proceed) {
            history.push('/checkout')
        }
    }

    async postCart(item, proceed = false) {
        let response = await CartService.addUserCart({
            product_id: item.product_id,
            quantity: item.quantity
        });
        if (response && response.data.status) {
            this.props.addToCart(response.data.data);
            if (proceed) {
                history.push('/checkout')
            }
        }
    }
    addToCart(item) {
        if (this.props.access_token) {
            this.postCart(item);
        } else {
            this.postLocalCart(item)
        }

    }
    getStars(n, id) {
        let stars = [];
        for (var i = 1; i <= n; i++) {
            stars.push(<AiFillStar key={`star-${id}-${i}`} />);
        }
        return stars;
    }
    render() {
        return (
            <div className="description mt-4 mt-md-0">
                <p className="f-sm clr-tk">House of kanakambaram</p>
                <h1 className="h3">{this.props.data.name}</h1>
                <p className="f-md">{this.props.data.description}</p>
                <p className="f-lg-bold mt-c2">
                    {this.props.data.discount_price ?
                        <>
                            <span className="f-xl-bold mr-2">{this.props.data.currency} {this.props.data.discount_price}</span>
                            <span className="f-xl-bold clr-tk"><s>{this.props.data.currency} {this.props.data.price}</s></span>
                        </>
                        : <span className="f-xl-bold">{this.props.data.currency} {this.props.data.price}</span>}

                </p>
                <div className="quantity mt-c2 justify-content-center justify-content-md-start">
                    {this.props.data.stock > 0 ?
                        <>
                            <p className="f-md mr-3 align-self-center">Quantity</p>

                            <div className=" box-c">
                                <div className="box" onClick={this.decreaseQuantity}>
                                    <FiMinus />
                                </div>
                                <div className="box"><span className="f-md-bold">{this.state.quantity}</span></div>
                                <div className="box" onClick={this.increaseQuantity}>
                                    <FiPlus />
                                </div>
                            </div>
                        </>
                        : <p className="clr-tm">Out of stock</p>}
                </div>
                <div className="cart mt-c2">
                    {(!this.findIsCart() && (this.props.data.stock > 0)) ?
                        <Button onClick={(e) => this.addToCart({ product_id: this.props.data.id, quantity: this.state.quantity })} className="mr-3 px-3 px-sm-4 px-lg-5">Add to Cart</Button>
                        : ''}
                    {this.props.data.stock > 0 &&
                        <Button onClick={(e) => this.buyNow(this.props.data)} className="px-3 px-sm-4 px-lg-5">Buy it Now</Button>
                    }

                </div>
                <div className="line my-c2"></div>
                <Col sm={12} className="px-0 detaild text-left">
                    <p className="f-md">{this.props.data.code ? '# ' + this.props.data.code : ''}</p>
                    <h6 className="f-lg-bold">Product Features</h6>
                    <ul >
                        {(this.props.data.customfields != undefined && Object.keys(this.props.data.customfields).length) ?
                            Object.keys(this.props.data.customfields).map((item, index) => {
                                return <li key={index} className="d-flex">
                                    <p className=" w-50">{item}</p>
                                    <p className="">: {this.props.data.customfields[item]}</p>
                                </li>
                            })
                            :
                            ''
                        }
                        {/* <li className="d-flex">
                        <p className=" w-50">Items included</p>
                        <p className="">: 1 Saree</p>
                    </li>
                    <li className="d-flex">
                        <p className=" w-50">Dimension in Meeters</p>
                        <p className=" ">: 5 x 5</p>
                    </li>
                    <li className="d-flex">
                        <p className=" w-50">Weight</p>
                        <p className="">: 600 gms</p>
                    </li>
                    <li className="d-flex">
                        <p className="w-50">Material</p>
                        <p className="">: Mixed cotton</p>
                    </li> */}
                    </ul>
                    {/* <p className="f-md">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p> */}

                </Col>
                <div className="line my-c2"></div>
                {(this.props.data.ratings != undefined && this.props.data.ratings.length) ?
                    <Col sm={12} className="px-0 reviews text-left">

                        <h6 className="f-lg-bold">Reviews</h6>
                        <ul >
                            {this.props.data.ratings.map((rItem, rIndex) => {
                                return <li key={`r-${rIndex}`} className="">
                                    <p className="">{rItem.message}</p>
                                    <div className="author d-block">
                                        {/* <p className="f-md-bold mr-3">Arushi Chawla, <span className="f-sm">Bangalore</span></p> */}
                                        <div className="stars">
                                            {this.getStars(rItem.rating, rItem.id)}
                                        </div>
                                        <Col>
                                            <div className="row">
                                                {rItem.images.map((item, index) => {
                                                    return <div className="img-box img-parent">
                                                        <img width="20" className="img-ch" key={`r-img-${rItem.id}-${index}`} src={item.url} alt="" />
                                                    </div>
                                                })}
                                            </div>
                                        </Col>
                                    </div>
                                </li>
                            })}


                        </ul>

                    </Col>
                    : ''}
            </div >
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Descriptions)