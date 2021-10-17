import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToCart } from '../../js/actions';
import { connect } from "react-redux";
import CartService from '../../general/services/CartService';

const mapStateToProps = state => ({
    bag: state.bag
})
function mapDispatchToProps(dispatch) {
    return {
        addToCart: val => dispatch(addToCart(val))
    };
}

class Success extends Component {
    componentDidMount() {
        this.props.addToCart([])
        this.clearLocalCart();
    }
    async clearLocalCart() {
        let response = await CartService.clearLocalCart();
    }
    render() {
        return (
            <div id="page-payment-response" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
                <Container>
                    <Row className="mb-4">
                        <Col className="text-center">
                            <img src="/base/icons/success.png" width="50" alt="" />
                            <h3 className="h3 mt-3">Your payment was successfull</h3>
                            <p className="f-sm">Thank you for your purchase. <br />We will be in contact with more details shortly.</p>

                            <Link to="/search" className=" shop"><Button className="px-5">Continue Shopping</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Success)