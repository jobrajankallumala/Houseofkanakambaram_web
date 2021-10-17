import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap';
import Item from './Item';
import { connect } from "react-redux";
import { addToWishList, addToCart } from '../../js/actions'
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';
import WishListService from '../../general/services/WishListService';
import CartService from '../../general/services/CartService';

const mapStateToProps = state => ({
    wishList: state.wishList,
    access_token: state.access_token,
    bag: state.bag
})
function mapDispatchToProps(dispatch) {
    return {
        addToWishList: val => dispatch(addToWishList(val)),
        addToCart: val => dispatch(addToCart(val)),
    };
}
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    async remove(id) {
        let response = await WishListService.removeUserWish(id);
        if (response && response.data.status) {
            this.props.addToWishList(response.data.data)
          
        }
    }
    
    addToCart(item) {
        if (this.props.access_token) {

            this.postCart(item);
        }
    }
    async postCart(item) {
        let response = await CartService.addUserCart({
            product_id: item.product_id,
            quantity: 1
        });
        if (response && response.data.status) {
            this.props.addToCart(response.data.data);
        }
    }
    render() {
        return (
            <div id="page-wish-list" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
                <Container className="text-center">
                    <h2 className="h3 mb-5">Wishlist</h2>
                    <Row className="items">
                        {this.props.wishList.length ? this.props.wishList.map((item, index) => {
                            return <Item
                                data={item}
                                key={index}
                                remove={(id) => this.remove(id)}
                                cartItems={this.props.bag}
                                addToCart={(item) => this.addToCart(item)}
                            />
                        }) :
                            <p className="w-100 text-center">No items in your wish list.</p>
                        }

                    </Row>
                </Container>
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
