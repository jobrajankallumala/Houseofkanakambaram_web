import React, { Component } from 'react'
import { Accordion, Button, Card, Col, Container, Row } from 'react-bootstrap';
import Item from './Item';
import Total from './Total';
import Address from './forms/AddressForm';
import Login from '../auth/forms/LoginForm';
import { addToCart, userAccessToken } from '../../js/actions';
import { connect } from "react-redux";
import CartTtemsStorage from '../../general/localStorage/CartTtemsStorage';
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';
import Swal from 'sweetalert2';
import history from '../../general/lib/history';
import Select from 'react-select'
import CartService from '../../general/services/CartService';

const mapStateToProps = state => ({
    bag: state.bag,
    access_token: state.access_token,
})
function mapDispatchToProps(dispatch) {
    return {
        addToCart: val => dispatch(addToCart(val)),
        userAccessToken: val => dispatch(userAccessToken(val)),
    };
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeEventKey: 0,
            showLoginModal: false,
            quantity: 1,
            subtotal: 0,
            addressList: [],
            address_id: '',
            addressForm: false,
            address: {}
        }
    }
    clickOnTab(key) {
        this.setState({ activeEventKey: key })
    }
    componentDidMount() {
        if (!this.props.access_token) {
            this.setState({ showLoginModal: true });
        } else {
            this.getAddress();
        }
        // let cartItems = CartTtemsStorage.loadState();
        // if (cartItems && cartItems.length && !this.props.access_token) {
        //     this.props.addToCart(cartItems);
        //     let subtotal = cartItems.map(this.amount).reduce(this.sum);
        //     this.setState({ subtotal });
        // }
    }
    // amount(item) {
    //     return item.total;
    // }
    // sum(prev, next) {
    //     return prev + next;
    // }
    async postCart(item) {
        let response = await CartService.addUserCart({
            product_id: item.product_id,
            quantity: item.quantity
        });
        if (response && response.data.status) {
            this.props.addToCart(response.data.data);
        }
    }
    async getUserCart(addressId = null) {
        // CartTtemsStorage.saveState({});
        let cart = await CartService.getUserCart(addressId);
        if (cart && cart.data.data.products) {
            this.props.addToCart(cart.data.data);
        }
    }
    changeQuantity(index, quantity) {
        if (this.props.access_token) {
            this.postCart({ product_id: this.props.bag.products[index].product_id, quantity: quantity })
        }
        // let cartItems = this.props.bag;
        // cartItems[index].quantity = quantity;
        // cartItems[index].total = cartItems[index].price * quantity;

        // this.props.addToCart(cartItems);
        // CartTtemsStorage.saveState(cartItems);
        // let subtotal = cartItems.map(this.amount).reduce(this.sum);
        // this.setState({ subtotal });
    }
    doneLogin(val) {
        this.addItemsToCart();
        this.getAddress();
    }
    getAddress() {
        let url = UrlService.getAllUserAddressUrl();
        HttpService.get(url)
            .then(response => {
                if (response.data.status) {
                    let list = response.data.data.map((item, index) => {
                        return { value: item.id, label: `${item.contact_name}, ${item.address_line_one},${item.postal_code}`, data: item }
                    })
                    this.setState({ addressList: list })
                }
            })
            .catch(error => {

            })
    }
    addedAddress(address) {
        let item = { value: address.id, label: `${address.contact_name}, ${address.address_line_one},${address.postal_code}`, data: address }
        let addressList = this.state.addressList;
        addressList.push(item)
        this.setState({ address_id: address.id, addressList: addressList });
        this.getUserCart(address.id);
    }
    doneUpdateAddress(addresses, id) {
        let list = addresses.map((item, index) => {
            return { value: item.id, label: `${item.contact_name}, ${item.address_line_one},${item.postal_code}`, data: item }
        })
        this.setState({ addressList: list });
        this.getUserCart(id);
    }
    async addItemsToCart() {
        this.setState({ showLoginModal: false });
        if (this.props.bag.products) {
            let data = this.props.bag.products.map((item, index) => {
                return {
                    id: item.product_id,
                    quantity: item.quantity
                }
            });

            let response = await CartService.multipleAddUserCart({ products: data })
                .then(response => {
                    if (response.data.status) {
                        this.props.addToCart(response.data.data)
                        this.clearLocalCart();
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: ''
                    })
                })
        }

    }
    handleChangeAddress = (name, selectedOption) => {
        this.setState({ [name]: selectedOption.value, address: selectedOption.data, addressForm: false });
        this.getUserCart(selectedOption.value);
    }
    async clearLocalCart() {
        let response = await CartService.clearLocalCart();
    }

    loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async displayRazorpay() {
        const res = this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // creating a new order
        let url = UrlService.checkoutUrl();
        let data = {
            address_id: this.state.address_id,
            currency_id: 1,
        }
        const result = await HttpService.get(url, data);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        const paymentObject = new window.Razorpay(result.data.data.payment_gateway);
        paymentObject.open();

    }
    removeCart(index) {
        if (this.props.access_token) {
            this.removeproductFromCart(this.props.bag.products[index].product_id)
        }
    }
    async removeproductFromCart(productId) {
        let response = await CartService.removeUserCart(productId);
        if (response && response.data.status) {
            this.props.addToCart(response.data.data);
        }
    }
    render() {
        return (
            <div id="page-checkout" className="py-2 pt-lg-5 pb-md-5 mt-4 mb-xs-4 mb-5">
                <Container className="">
                    <h2 className="h3 mb-5 text-center">Checkout</h2>
                    <Row>
                        <Col lg={7}>
                            <Accordion defaultActiveKey="1">
                                {/* <div className="border-bottom py-3">
                                    <Accordion.Toggle
                                        variant="link"
                                        eventKey="0"
                                        className={`title ${this.state.activeEventKey == 0 ? 'active' : ''}`}
                                        onClick={() => this.clickOnTab(0)}
                                    >
                                        1. Login
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>Hello! I'm the body</Card.Body>
                                    </Accordion.Collapse>
                                </div> */}
                                <Login
                                    show={this.state.showLoginModal}
                                    onHide={() => this.setState({ showLoginModal: !this.state.showLoginModal })}
                                    done={(val) => this.doneLogin(val)}
                                    loadWishList={true}
                                    loadCart={false}
                                    closeBtn={false}
                                />
                                <div className="border-bottom py-3">

                                    <Accordion.Toggle
                                        variant="link"
                                        eventKey="1"
                                        className={`title ${this.state.activeEventKey == 1 ? 'active' : ''}`}
                                        onClick={() => this.clickOnTab(1)}
                                    >
                                        2. Select Address
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <div className="mb-3">
                                                <Select
                                                    value={this.state.addressList.filter(({ value }) => value == this.state.address_id)}
                                                    onChange={(selected) => this.handleChangeAddress('address_id', selected)}
                                                    options={this.state.addressList} />

                                            </div>
                                            {!this.state.addressForm ?
                                                <>
                                                    {Object.keys(this.state.address).length ? <p >
                                                        {this.state.address.contact_name}<br />
                                                        {this.state.address.contact_email ? this.state.address.contact_email : ''}<br />
                                                        {this.state.address.contact_phone}<br />
                                                        {this.state.address.address_line_one}<br />
                                                        {this.state.address.address_line_two}<br />
                                                        {this.state.address.city},
                                                        {this.state.address.postal_code}
                                                    </p> : ''}
                                                    <p className="cp f-md-bold-sm mt-5" onClick={() => this.setState({ addressForm: true, address_id: '' })}>Add new address +</p>
                                                </>
                                                : <>
                                                    <h6 className="h6 mt-4">New Address</h6>
                                                    <Address
                                                        addedAddress={(address) => this.addedAddress(address)}
                                                        doneUpdate={(addresses, id) => this.doneUpdateAddress(addresses, id)}
                                                    />
                                                </>}
                                            {this.state.address_id ?
                                                <Button
                                                    className="mt-5 btn-pay"
                                                    onClick={() => this.displayRazorpay()}
                                                >Proceed To pay</Button>
                                                : ''}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </div>

                                {/* <div className="border-bottom py-3">
                                    <Accordion.Toggle
                                        variant="link"
                                        eventKey="2"
                                        className={`title ${this.state.activeEventKey == 2 ? 'active' : ''}`}
                                        onClick={() => this.clickOnTab(2)}
                                    >
                                        3. Pay
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                    </Accordion.Collapse>
                                </div>
                                <div className="border-bottom py-3">
                                    <Accordion.Toggle variant="link"
                                        eventKey="3"
                                        className={`title ${this.state.activeEventKey == 3 ? 'active' : ''}`}
                                        onClick={() => this.clickOnTab(3)}
                                    >
                                        4. Confirmation
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                    </Accordion.Collapse>
                                </div> */}
                            </Accordion>
                        </Col>
                        <Col lg={5}>
                            <div className="cart mt-md-0 mt-5">
                                <h4 className="f-lg-bold mb-4">Items in your Order</h4>
                                {this.props.bag.products ? this.props.bag.products.map((item, index) => {
                                    return <Item
                                        data={item}
                                        key={index}
                                        bag={this.props.bag}
                                        index={index}
                                        changeQuantity={(index, quantuty) => this.changeQuantity(index, quantuty)}
                                        removeCart={(index) => this.removeCart(index)}
                                    />
                                }) : ''}
                            </div>
                            <Total
                                bag={this.props.bag}
                                data={this.props.bag} />
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
)(Index)