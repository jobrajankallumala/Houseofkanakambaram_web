import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnLoading from '../../../general/lib/BtnLoading';
import AuthService from '../../../general/services/AuthService';
// import UserService from '../../../general/services/UserService';
import CartService from '../../../general/services/CartService';
import swal from 'sweetalert2';
import History from '../../../general/lib/history';
import { userAccessToken, addCartSummary, addToCart } from '../../../js/actions/index'
import {
    Row,
    Col,
    Button,
    Form,
} from 'react-bootstrap';
import {
    Link
} from "react-router-dom";
import CartTtemsStorage from '../../../general/localStorage/CartTtemsStorage';

const mapStateToProps = state => ({
    // access_token: state.access_token
});
function mapDispatchToProps(dispatch) {
    return {
        userAccessToken: status => dispatch(userAccessToken(status)),
        addCartSummary: status => dispatch(addCartSummary(status)),
        addToCart: status => dispatch(addToCart(status)),
        // currentUser: status => dispatch(currentUser(status))
    };
}

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: "",
            password: "",
            isChecked: false,
            error: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        this.setState({ name: value });

        this.setState({ errors, [name]: value });
    };
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        this.setState({ error: null });

        // if (IsValid(this.state.errors)) {

        let postData = {
            username: this.state.username,
            password: this.state.password
        }
        let response = await AuthService.doUserLogin(postData);
        if (response.status != 100) {
            this.setState({ loading: false });
            this.setState({ error: 'Invalid credentials !' });
        } else {
            this.setState({ loading: false });
            let user = await AuthService.handleLoginSuccess(response.data.data, this.state.isChecked);

            // manage user cart
            this.props.userAccessToken(response.data.data.token);
            let clearCart = await CartService.clearLocalCart();
            let cart = await CartService.getUserCart();

            if (cart.data.data.products) {
                this.props.addToCart(cart.data.data);
            }

            History.push("/my-account");

        }

        // }

    };
    render() {
        const { username, password, isChecked } = this.state;
        return (
            <div className="tm-form auth-form">
                <Form onSubmit={this.handleSubmit}>
                    <Row className="row">

                        <Form.Group controlId="formBasicEmail" className="col-sm-12 px-md-3 px-0" >
                            <Form.Control value={username} type="text" name="username" onChange={this.handleChange} required v-required="true" v-email="true" v-label="Email" placeholder="Email" />

                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="col-sm-12 px-md-3 px-0">

                            <Form.Control value={password} type="password" onChange={this.handleChange} required name="password" v-required="true" v-label="Password" placeholder="Password" />

                            <span className="validation-error col-12 p-0 clr-f">{this.state.error}</span>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="col-sm-12 submit px-md-3 px-0">
                            <Button disabled={this.state.loading} type="submit" className="btn-submit px-5">{this.state.loading ? <BtnLoading title="" /> : 'Login'}</Button>
                        </Form.Group>

                    </Row>
                    {/* <Row className="mt-4">
                        <Col className="col-auto align-self-center">
                            <p className="p2 signup-link m-0">Create account ?  <Link to="#" onClick={() => this.switchAuthModal()}>Sign up</Link></p>
                        </Col>

                        <Col className="col-auto ml-auto mt-4 mt-md-0">
                            <Button disabled={this.state.loading} type="submit" className="btn-submit px-5">{this.state.loading ? <BtnLoading title="" /> : 'Next'}</Button>
                        </Col>
                        <Col className="col-auto align-self-center">
                            <p className="p2 signup-link m-0"><Link to="#" onClick={() => this.switchForgotPassword()}>Forgot Password</Link></p>
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
)(SignInForm);