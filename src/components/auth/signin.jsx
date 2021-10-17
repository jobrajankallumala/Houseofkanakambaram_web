import React, { Component } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
    Link
} from "react-router-dom";

export default class signin extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="signup-modal"

            >

                <Modal.Body>
                    <h2 className="clr-a title">Get started with your account</h2>
                    <Form>
                        <Row className="row">

                            <Form.Group controlId="formBasicEmail" className="col-sm-12">
                                <Form.Label>email</Form.Label>
                                <Form.Control type="email" placeholder="" />

                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="col-sm-12">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" placeholder="" />

                            </Form.Group>

                        </Row>
                        <Row className="mt-4">
                            <Col className="col-auto align-self-center">
                                <p className="p2 signup-link m-0">Create account ?  <Link to="#">Sign in</Link></p>
                            </Col>
                            <Col className="col-auto ml-md-auto mt-4 mt-md-0">
                                <Button className="btn-submit px-5">Next</Button>
                            </Col>
                        </Row>
                    </Form>

                    <Row className="social-signin-container">
                        <Col className="col-auto px-sm-3 px-0">
                            <Button type="btn" className="social-signin-btn"><FaFacebook />FACEBOOK</Button>

                        </Col>
                        <Col className="col-auto">
                            <Button type="btn" className="social-signin-btn"><FcGoogle />Google</Button>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>
        )
    }
}
