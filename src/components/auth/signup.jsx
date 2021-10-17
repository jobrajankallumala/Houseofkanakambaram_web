import React, { Component } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
// import { signUpShow, signInShow } from "../js/actions/index";
import { connect } from "react-redux";

// function mapDispatchToProps(dispatch) {
//     return {
//         signUpShow: status => dispatch(signUpShow(status)),
//         signInShow: status => dispatch(signInShow(status)),
//     };
// }

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    clickSignIn() {
        this.props.signInShow(true)
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="signup-modal"

            >
                <Modal.Body>
                    <h2 className="clr-a title">Get started with your account</h2>
                    <Form>
                        <Row className="row">
                            <Form.Group controlId="formBasicFullName" className="col-sm-6">
                                <Form.Label>full name</Form.Label>
                                <Form.Control type="text" placeholder="" />

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="col-sm-6">
                                <Form.Label>email</Form.Label>
                                <Form.Control type="email" placeholder="" />

                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="col-sm-6">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" placeholder="" />

                            </Form.Group>
                            <Form.Group controlId="formBasicRePassword" className="col-sm-6">
                                <Form.Label>repeat password</Form.Label>
                                <Form.Control type="password" placeholder="" />

                            </Form.Group>
                        </Row>
                        <Row className="mt-4">
                            <Col className="col-auto align-self-center">
                                <p className="mb-0 text-muted">By signing up, I agree to the Treva Privacy Policy and Terms of Service.</p>
                            </Col>
                            <Col className="col-auto ml-md-auto mt-4 mt-md-0">
                                <Button className="btn-submit px-5">Next</Button>
                            </Col>
                        </Row>
                    </Form>
                    <p className="p2 signin-link">Already have an account?  <span className="clr-d" to="#">Login</span></p>
                    <Row className="social-signin-container">
                        <Col className="col-auto px-sm-3 px-0">
                            <Button type="btn" className="social-signin-btn"><FaFacebook />FACEBOOK</Button>

                        </Col>
                        <Col className="col-auto">
                            <Button type="btn" className="social-signin-btn"><FcGoogle />Google</Button>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal >
        );
    }
}

export default signup;