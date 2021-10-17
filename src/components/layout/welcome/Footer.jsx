import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaFacebookF, FaPinterestP, FaShippingFast } from 'react-icons/fa';
import { RiHeart2Line } from 'react-icons/ri';
import { GiCardboardBox } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineInstagram } from 'react-icons/ai';
import { ImYoutube2 } from 'react-icons/im';
import { connect } from "react-redux";
import { addToCart, addToWishList, addCartSummary } from '../../../js/actions';
import CartTtemsStorage from '../../../general/localStorage/CartTtemsStorage';
import UrlService from '../../../general/services/UrlService';
import HttpService from '../../../general/services/HttpService';
import CartService from '../../../general/services/CartService';
import WishListService from '../../../general/services/WishListService';

const mapStateToProps = state => ({
    bag: state.bag,
    access_token: state.access_token,
    allSettings: state.allSettings,
})
function mapDispatchToProps(dispatch) {
    return {
        addToCart: val => dispatch(addToCart(val)),
        addToWishList: val => dispatch(addToWishList(val)),
        addCartSummary: val => dispatch(addCartSummary(val)),
    };
}
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                currency_id: 1,
                category_id: '',
                tag_id: '',
                filter_by: 'created_at',
                order_by: 'desc',
                tag_string: 'trending',
                price_min: 0,
                price_max: 100000,
                limit: 5,
                page: 1
            },
            trendingItems: []
        }
    }
    componentDidMount() {
        this.getTrendingIntems();
        if (this.props.access_token) {
            this.getUserCart();
            this.getUserWish();
        } else {
            this.getLocalCart()
        }
    }

    getTrendingIntems() {
        let url = UrlService.searchProductsUrl();
        HttpService.openGet(url, this.state.filter)
            .then(response => {
                let data = response.data;

                if (response.data.status) {
                    // setItemes(data.data.products.data);
                    this.setState({ trendingItems: data.data.products.data });
                    // console.log(items)
                }
            }).catch(errors => {
                console.log('error' + errors)
            });
    }

    async getLocalCart() {
        let response = await CartService.getLocalCart();
        this.props.addToCart(response);
    }

    async getUserCart() {
        let clearCart = await CartService.clearLocalCart();
        let cart = await CartService.getUserCart();

        if (cart && cart.data.data.products) {
            this.props.addToCart(cart.data.data);
            // this.props.addCartSummary({
            //     sub_total: cart.data.data.sub_total,
            //     tax_amount: cart.data.data.tax_amount,
            //     total: cart.data.data.total
            // })
        }
    }
    async getUserWish() {
        let response = await WishListService.getUserWish();
        if (response && response.data.data) {
            this.props.addToWishList(response.data.data);
        }
    }
    render() {
        const { trendingItems } = this.state;
        return (
            <div id="footer" >
                <div className="bg-ta">
                    <Container>
                        <Row className="text-center">
                            <Col sm={4} className="pt-5 pb-sm-5 px-0">
                                <div className="border-rt px-3">
                                    <FaShippingFast className="h2" />
                                    <h5 className="h5">Wordwide Shipping</h5>
                                    <p className="f-md">Credit Note - Validity 3 Months</p>
                                </div>
                            </Col>
                            <Col sm={4} className="pt-5 pb-sm-5 px-0">
                                <div className="border-rt px-3">
                                    <RiHeart2Line className="h2" />
                                    <h5 className="h5">Amazing Customer Service</h5>
                                    <p className="f-md">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </Col>
                            <Col sm={4} className="py-5  px-0">
                                <div className=" px-3">
                                    <GiCardboardBox className="h2" />
                                    <h5 className="h5">Trusted Quality</h5>
                                    <p className="f-md">Lorem Ipsum is simply dummy text</p>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>
                <div className="py-5">
                    <Container className="mt-4">
                        <Row>
                            <Col md={5} className="about">
                                <h5 className="h6 mb-4">About Us</h5>
                                <p className="f-md"><b>House of Kanakambaram (HOK)</b> is a craft based online store started with an initiative to promote the traditional handicraft and handloom products. Through this, we provide both the artisans and weavers a platform to showcase their skills and sell their products to earn a living out of it. </p>
                                {(this.props.allSettings.logo && this.props.allSettings.logo.content) &&
                                    <div className="logo py-4">
                                        <img src={this.props.allSettings.logo.content} alt="" className="img-fluid w-50" />
                                    </div>
                                }
                            </Col>
                            <Col md={3} className="menu ">
                                <h5 className="h6 mb-4">Trending</h5>
                                <ul className="">
                                    {trendingItems.length ? trendingItems.map((item, index) => {
                                        return <li key={`tr-${index}`}>
                                            <Link to="/search?filter_by=created_at&order_by=desc&tag_string=trending">{item.name}</Link>
                                        </li>
                                    }) : ''}

                                </ul>
                            </Col>
                            <Col md={4} className="subscription mt-4 mt-md-0">
                                <h5 className="h6 mb-4">Become an House of kanakambaram and
                                    get amazing offers</h5>
                                {/* <Form.Group controlId="exampleForm.ControlInput1" className="mb-4">
                                    <Form.Control type="email" placeholder="name@example.com" />
                                    <Button>
                                        <BsArrowRight />
                                    </Button>
                                </Form.Group> */}
                                <div className="">
                                    <img className="mb-1" src="/base/icons/master-card.png" alt="" />
                                    <img className="mb-1" src="/base/icons/master-card.png" alt="" />
                                    <img className="mb-1" src="/base/icons/master-card.png" alt="" />
                                    <img className="mb-1" src="/base/icons/master-card.png" alt="" />
                                    <img className="mb-1" src="/base/icons/master-card.png" alt="" />
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center mt-5 mt-md-3">
                            <img src="/base/icons/art-01.svg" alt="" width="80" />
                        </Row>
                        <Row className="social-icons mt-4">

                            {(this.props.allSettings.instagram && this.props.allSettings.instagram.content) &&
                                <a href={this.props.allSettings.instagram.content} target="_blank">
                                    <AiOutlineInstagram />
                                </a>
                            }
                            {(this.props.allSettings.facebook && this.props.allSettings.facebook.content) &&
                                <a href={this.props.allSettings.facebook.content} target="_blank">
                                    <FaFacebookF />
                                </a>
                            }
                            {(this.props.allSettings.pinterest && this.props.allSettings.pinterest.content) &&
                                <a href={this.props.allSettings.pinterest.content} target="_blank">
                                    <FaPinterestP />
                                </a>
                            }
                            {(this.props.allSettings.youtube && this.props.allSettings.youtube.content) &&
                                <a href={this.props.allSettings.youtube.content} target="_blank">
                                    <ImYoutube2 />
                                </a>
                            }

                        </Row>
                        <Row className="justify-content-center mt-3">
                            <Col md={6} sm={8}>
                                <p className="f-sm-bold-sm text-center">
                                    © 2021 House of Kanakambaram. All Rights Reserved. <Link to="/terms-and-conditions" className="clr-ta">Terms & Condition</Link> | <Link to="/terms-and-conditions" className="clr-ta">Privacy Policy </Link>
                                    House of Kanakambaram, 601, Floral Deck Plaza, MIDC Cross Road, Andheri East, Wayanad, 673121
                                    sales@hok.com | +91 98765 43210
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)