import React, { Component } from 'react';
import { BiHeart, BiShoppingBag } from 'react-icons/bi';
import { connect } from "react-redux";
import { addToCart, addToWishList } from '../../js/actions';
import HttpService from '../../general/services/HttpService';
import UrlService from '../../general/services/UrlService';
import WishListService from '../../general/services/WishListService';
import CartTtemsStorage from '../../general/localStorage/CartTtemsStorage';
import History from '../../general/lib/history';
import CartService from '../../general/services/CartService';
import LoginForm from '../auth/forms/LoginForm';

const mapStateToProps = state => ({
    bag: state.bag,
    access_token: state.access_token,
    wishList: state.wishList
})
function mapDispatchToProps(dispatch) {
    return {
        addToCart: val => dispatch(addToCart(val)),
        addToWishList: val => dispatch(addToWishList(val)),
    };
}
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '',
            showLoginModal: false,
            currentItem: {}
        }
    }
    addToCart(item) {
        if (this.props.access_token) {

            this.postCart(item);
        } else {
            this.postLocalCart(item);
        }

    }
    async addToWish(item) {
        this.setState({ currentItem: item });
        if (!this.props.access_token) {
            this.setState({ showLoginModal: true });
        } else {
            let response = await WishListService.addWishList(item.id);
            if (response && response.data.status) {
                this.props.addToWishList(response.data.data);
            }
        }
    }
    async postLocalCart(item) {
        let response = await CartService.addLocalCart(this.props.bag, item);
        this.props.addToCart(response);
    }
    async getWishList() {
        let response = await WishListService.getUserWish();
        this.props.addToWishList(response.data.data);
    }
    async postCart(item) {
        let response = await CartService.addUserCart({
            product_id: item.id,
            quantity: 1
        });
        if (response && response.data.status) {
            this.props.addToCart(response.data.data);
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
    findIsWish() {
        let items = this.props.wishList;
        let exItem = items.find(e => e.product_id == this.props.data.id);

        if (exItem == undefined) {
            return false
        }
        return true

    }
    clickItem = (event, item) => {
        var noRedirect = '.t-cart *';
        if (!event.target.matches('.t-cart *') && !event.target.matches('.modal *')) {
            this.props.loadNextProduct(item.id);
            History.push(`/product/${item.id}`);
        }
    }
    componentDidMount() {
        const width = this.divElement.clientWidth;
        this.setState({ width });
    }
    doneLogin(val) {
        this.setState({ showLoginModal: false });
        this.addToWish(this.state.currentItem)
    }
    render() {
        return <div
            onClick={(event) => this.clickItem(event, this.props.data)}
            className="mb-4 col-lg-3 col-md-4 col-6 cp">
            <div className="item-box img-parent mb-3"
                ref={(divElement) => { this.divElement = divElement }}
                style={{ 'height': this.state.width + 5 }}>
                <img src={this.props.data.image} alt="" className="img-ch" />
                {(this.props.data.discount != undefined && Object.keys(this.props.data.discount).length) ?
                    <div className="t-offer clr-tlt">{parseFloat(this.props.data.discount.percentage)} %<br />off</div>
                    : ''}
                <div className="t-cart d-flex">
                    {(!this.findIsWish()) ?
                        <div className=" wish" onClick={(e) => this.addToWish(this.props.data)}>
                            <BiHeart
                            />
                        </div>
                        : ''}
                    {(!this.findIsCart() && (this.props.data.stock > 0)) ?
                        <div className="bag ml-sm-3 ml-1" onClick={(e) => this.addToCart(this.props.data)} >
                            <BiShoppingBag

                            />
                        </div>
                        : ''}
                </div>
            </div>

            <p className="f-md-bold text-left">{this.props.data.name}</p>
            <div className="d-flex">

                {this.props.data.discount_price ?
                    <>
                        <span className="f-md-bold-sm mr-2">{this.props.data.currency} {this.props.data.discount_price}</span>
                        <span className="f-md-bold-sm clr-tk"><s>{this.props.data.currency} {this.props.data.price}</s></span>
                    </>
                    : <span className="f-md-bold-sm clr-tk">{this.props.data.currency} {this.props.data.price}</span>}
            </div>

            <LoginForm
                show={this.state.showLoginModal}
                onHide={() => this.setState({ showLoginModal: !this.state.showLoginModal })}
                done={(val) => this.doneLogin(val)}
                loadWishList={true}
                loadCart={true}
            />
        </div>
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item)
