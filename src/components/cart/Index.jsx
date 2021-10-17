import React, { Component } from 'react'
import { Container, Row, Form, Col, Table } from 'react-bootstrap';

import PromoCode from './PromoCode';
import Total from './Total';
import Item from './Item';
import { addToCart } from '../../js/actions';
import { connect } from "react-redux";
import CartTtemsStorage from '../../general/localStorage/CartTtemsStorage';
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';
import CartService from '../../general/services/CartService';

const mapStateToProps = state => ({
    bag: state.bag,
    access_token: state.access_token
})
function mapDispatchToProps(dispatch) {
    return {
        addToCart: val => dispatch(addToCart(val)),
    };
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            subtotal: 0
        }
    }
    componentDidMount() {
        // let cartItems = CartTtemsStorage.loadState();

        // if (!this.props.access_token && cartItems && cartItems.length) {
        //     this.props.addToCart(cartItems);
        //     let subtotal = cartItems.map(this.amount).reduce(this.sum);
        //     this.setState({ subtotal });
        // }
    }

    async postCart(item) {
        let response = await CartService.addUserCart({
            product_id: item.product_id,
            quantity: item.quantity
        });
        if (response && response.data.status) {
            this.props.addToCart(response.data.data);
        }
    }
    changeQuantity(index, quantity) {
        if (this.props.access_token) {
            this.postCart({ product_id: this.props.bag.products[index].product_id, quantity: quantity })
        }
        else {
            this.updateCartLocal(index, { quantity: quantity });
        }

    }

    async updateCartLocal(index, data) {
        let response = await CartService.postQuantityForLocalCart(this.props.bag, index, data);
        this.props.addToCart(response);
    }

    removeCart(index) {
        if (this.props.access_token) {
            this.removeproductFromCart(this.props.bag.products[index].product_id)
        } else {
            this.removeLocalCart(index);
        }
    }
    async removeLocalCart(index) {
        let response = await CartService.removeLocalCart(this.props.bag, index);
        this.props.addToCart(response);
    }

    async removeproductFromCart(productId) {
        let response = await CartService.removeUserCart(productId);
        if (response && response.data.status) {
            this.props.addToCart(response.data.data);
        }

    }

    render() {
        return (
            <div id="page-cart" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
                <Container className="text-center">
                    <h2 className="h3 mb-5">Shopping Cart</h2>
                    {/* <PromoCode /> */}
                    {console.log('123', this.props.bag.products ? this.props.bag.products.length : '')}
                    {(this.props.bag.products && this.props.bag.products.length) ?
                        <Row className="mt-5">

                            <Col md={9} className="table-container">

                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th className="pl-0">Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.bag.products.map((item, index) => {
                                            return <Item
                                                data={item}
                                                bag={this.props.bag}
                                                key={index}
                                                index={index}
                                                changeQuantity={(index, quantuty) => this.changeQuantity(index, quantuty)}
                                                removeCart={(index) => this.removeCart(index)}
                                            />
                                        })}
                                    </tbody>
                                </Table>

                            </Col>
                            <Col md={3}>
                                <Total
                                    data={this.props.bag}
                                    bag={this.props.bag} />
                            </Col>

                        </Row>
                        : <Row className="mt-5 pt-5">
                            <p className="mx-auto">No items in your bag.</p>
                        </Row>
                    }
                </Container>
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
