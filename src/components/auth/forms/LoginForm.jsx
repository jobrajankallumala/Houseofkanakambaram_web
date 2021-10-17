import React, { Component } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import HttpService from '../../../general/services/HttpService';
import UrlService from '../../../general/services/UrlService';
import OtpInput from 'react-otp-input';
import BtnLoading from '../../../general/lib/BtnLoading';
import AuthService from '../../../general/services/AuthService';
import { userAccessToken, addToWishList, addToCart } from '../../../js/actions';
import { connect } from "react-redux";
import CartService from '../../../general/services/CartService';
import WishListService from '../../../general/services/WishListService';

function mapDispatchToProps(dispatch) {
    return {
        userAccessToken: val => dispatch(userAccessToken(val)),
        addToWishList: val => dispatch(addToWishList(val)),
        addToCart: val => dispatch(addToCart(val)),
    };
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            mobile: '',
            email: '',
            otp: '',
            error: null,
            showOtpForm: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitOtp = this.handleSubmitOtp.bind(this);
    }
    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        this.setState({ name: value });

        this.setState({ errors, [name]: value });
    };
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true, error: null });
        let url = UrlService.signupWithOtpUrl();
        let data = {};
        let proceed = true;
        if (this.state.email) {
            data.username = this.state.email;
            data.channel = 'email';
        } else if (this.state.mobile) {
            data.username = this.state.mobile;
            data.channel = 'phone';
        } else {
            proceed = false;
            this.setState({ loading: false, error: 'Please enter email or mobile number' });
        }
        if (proceed) {
            HttpService.post(url, data)
                .then(response => {
                    this.setState({ loading: false });
                    if (response.status != 200) {
                        this.setState({ error: 'Invalid entry' })
                    } else {
                        if (response.data.status) {
                            this.setState({ showOtpForm: true })
                        } else {
                            this.setState({ error: 'Invalid entry' })
                        }
                    }
                })
                .catch(error => {
                    this.setState({ loading: false });
                })
        }
    }
    handleSubmitOtp(e) {
        e.preventDefault();
        this.setState({ loading: true, error: null });
        let url = UrlService.signinWithOtpUrl();
        let data = { otp: this.state.otp };
        let proceed = true;
        if (this.state.email) {
            data.username = this.state.email;
            data.channel = 'email';
        } else if (this.state.mobile) {
            data.username = this.state.mobile;
            data.channel = 'phone';
        } else {
            this.setState({ loading: false });
            proceed = false;
        }
        if (proceed) {
            HttpService.post(url, data)
                .then(response => {
                    this.setState({ loading: false });
                    if (response.status != 200) {
                        this.setState({ error: 'Invalid Otp' })
                    } else {
                        if (response.data.status) {
                            this.setState({ showOtpForm: false });
                            this.handleLoginSuccess(response.data.data);
                        }
                    }
                })
                .catch(error => {
                    this.setState({ loading: false });

                })
        }

    }
    async handleLoginSuccess(data) {
        let user = await AuthService.handleLoginSuccess(data);
        this.props.userAccessToken(data.token);

        // get user cart and store to redux
        if (this.props.loadCart) {
            let cart = await CartService.getUserCart();
            if (cart.data.data.products) {
                this.props.addToCart(cart.data.data);
            }
        }

        // get user wishlist and store to redux
        if (this.props.loadWishList) {
            let wish = await WishListService.getUserWish();
            this.props.addToWishList(wish.data.data);
        }

        this.props.done(true);
    }
    setErrors(response) {
        this.setState({ errors: response.data.errors });
        return true;
    }
    getKey(key) {
        return this.state.errors[key] !== undefined ? this.state.errors[key][0] : null;
    }
    reset() {
        this.setState({ errors: {} });
        return true;
    }
    render() {
        return (
            <Modal
                // {...props}
                size="md"
                show={this.props.show}
                onHide={this.props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                className="role-modal tm-modal eap-form"

            >
                <Modal.Header closeButton={this.props.closeBtn}>
                    <Modal.Title className={`${this.props.closeBtn ? 'ml-auto' : 'mx-auto'} f-md-bold`}>Login / Sigup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="tm-form login-form p-4">
                        {this.state.showOtpForm ?
                            <Form onSubmit={this.handleSubmitOtp} className="form-otp">
                                {this.state.email ?

                                    <div className="text-center">
                                        <h2 className="f-xl">
                                            We have send an otp to your mail account

                                        </h2>
                                        <p className="f-md">Please verify your account.</p>
                                    </div> :

                                    this.state.mobile ?
                                        <div className="text-center">

                                            <h2 className="f-xl">
                                                We have send an otp to your Mobile number

                                            </h2>
                                            <p className="f-md">
                                                Please verify your account.
                                            </p>
                                        </div> : ''}
                                <Row className="justify-content-center mt-4">
                                    <OtpInput
                                        value={this.state.otp}
                                        onChange={(otp) => this.setState({ otp })}
                                        numInputs={4}
                                        separator={<span className="mx-2"> - </span>}
                                        required={true}
                                    />
                                    {this.state.error ?
                                        <p className="validation-error w-100 text-center mt-3">{this.state.error}</p>
                                        : ''}
                                    <Form.Group controlId="formBasicEmail" className="col-sm-12 mb-0 mt-4 text-center px-0" >
                                        <Button disabled={this.state.loading} className="submit" type="submit">{this.state.loading ? <BtnLoading title="" /> : 'Proceed'}</Button>
                                    </Form.Group>
                                </Row>
                            </Form>

                            :
                            <Form onSubmit={this.handleSubmit}>
                                <Row className="row">
                                    <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                                        <Form.Control value={this.state.email} type="email" name="email" onChange={this.handleChange} v-required="true" v-email="true" v-label="Email" placeholder="Email *" />

                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail" className="col-sm-12 text-center f-md-bold-sm" >
                                        Or
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                                        <PhoneInput
                                            enableSearch={true}
                                            country={'us'}
                                            value={this.state.mobile}
                                            onChange={mobile => this.setState({ mobile })}
                                        />
                                    </Form.Group>
                                    {this.state.error ?
                                        <p className="validation-error w-100 text-center">{this.state.error}</p>
                                        : ''}
                                </Row>
                                <Form.Group controlId="formBasicEmail" className="col-sm-12 mb-0 text-center px-0" >
                                    <Button disabled={this.state.loading} className="submit" type="submit">{this.state.loading ? <BtnLoading title="" /> : 'Proceed'}</Button>
                                </Form.Group>

                            </Form>
                        }
                    </div>
                </Modal.Body>
            </Modal >
        )
    }
}
export default connect(
    null,
    mapDispatchToProps
)(LoginForm)