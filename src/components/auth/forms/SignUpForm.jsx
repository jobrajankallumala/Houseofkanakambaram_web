import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    Button,
    Form,
} from 'react-bootstrap';
import BtnLoading from '../../../general/lib/BtnLoading';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ValidationError from '../../../general/lib/validationerror';
import UrlService from '../../../general/services/UrlService';
import HttpService from '../../../general/services/HttpService';
import AuthService from '../../../general/services/AuthService';
import { userAccessToken } from '../../../js/actions/index';
import History from '../../../general/lib/history';
import CartService from '../../../general/services/CartService';
import CartTtemsStorage from '../../../general/localStorage/CartTtemsStorage';

function mapStateToProps(state) {
    return {

    };
}
function mapDispatchToProps(dispatch) {
    return {
        userAccessToken: status => dispatch(userAccessToken(status)),
    };
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: {},
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            isChecked:false
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.reset();
        this.setState({ loading: true })
        let url = UrlService.signupUrl();
        HttpService.openPost(url, {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        })
            .then(response => {
                this.setState({ loading: false });
                if (response.status == 422) {
                    this.setErrors(response);
                } else if (response.status == 200) {
                    let postData = {
                        username: this.state.email,
                        password: this.state.password
                    }
                    this.doLogin(postData);
                }
            })
            .catch(errors => {
                this.setState({ loading: false });

            });
    }
    async doLogin(data) {
        let signInresponse = await AuthService.doUserLogin(data);
     
        if (signInresponse.status != 100) {
            this.setState({ loading: false });
        } else {
            this.setState({ loading: false });
            let user = AuthService.handleLoginSuccess(signInresponse.data.data, this.state.isChecked);

            this.props.userAccessToken(signInresponse.data.data.token);

            let clearCart = await CartService.clearLocalCart();
            let cart = await CartService.getUserCart();

            if (cart.data.data.products) {
                this.props.addToCart(cart.data.data);
            }

            History.push("/my-account");

        }
    }
    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
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
            <div className="tm-form auth-form">
                <Form onSubmit={this.handleSubmit}>
                    <Row className="row">
                        <Form.Group controlId="formBasicFullName" className="col-sm-12 px-md-3 px-0">
                            <Form.Control value={this.state.name} type="text" name="name" onChange={this.handleChange} placeholder="Full Name" />
                            <ValidationError message={this.getKey('name')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12 px-md-3 px-0">
                            <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Email" />
                            <ValidationError message={this.getKey('email')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12 px-md-3 px-0">
                            <PhoneInput
                                enableSearch={true}
                                country={'us'}
                                value={this.state.phone}
                                onChange={phone => this.setState({ phone })}
                            />
                            <ValidationError message={this.getKey('phone')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="col-sm-12 px-md-3 px-0">
                            <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                            <ValidationError message={this.getKey('password')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicRePassword" className="col-sm-12 px-md-3 px-0">
                            <Form.Control type="password" name="password_confirmation" onChange={this.handleChange} placeholder="Repeat Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="col-sm-12 submit px-md-3 px-0">
                            <Button disabled={this.state.loading} type="submit" className="btn-submit px-5">{this.state.loading ? <BtnLoading title="" /> : 'Sign up'}</Button>
                        </Form.Group>
                    </Row>
                    {/* <Row className="mt-4">
                        <Col className="col-auto align-self-center">
                            <p className="mb-0 text-muted">By signing up, I agree to the Treva Privacy Policy and Terms of Service.</p>
                        </Col>
                        <Col className="col-auto ml-md-auto mt-4 mt-md-0">
                            <Button className="btn-submit px-5">Sign up</Button>
                        </Col>
                    </Row> */}
                </Form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);