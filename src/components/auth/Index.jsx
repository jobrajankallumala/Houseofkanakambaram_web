import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Index = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    return (
        <div id="page-auth" className="py-5 mt-sm-4 mb-4">
            <Container>
                <Row className="">
                    <Col md={6} className={`border-right login ${showSignUp ? 'hide' : ''}`}>
                        <Col md={10} className="mx-auto">
                            <Row>
                                <Col className="px-md-3 px-0">
                                    <h2 className="h2">Login</h2>
                                    <p className="f-md mb-4">Please enter your email & password</p>
                                </Col>
                            </Row>
                            <SignInForm />
                            <div className="text-center">
                                <Link to="/" className="w-100 f-lg-bold-sm">Lost your password ?</Link>
                                <p className="mt-3 d-block d-md-none">Don't have an account ? <span className="f-lg-bold-sm" onClick={() => setShowSignUp(true)}>Create one</span></p>
                            </div>
                            <div className="or-line my-5">
                                <div>Or</div>
                            </div>
                            <div className="text-center">
                                <Button className="btn-google"><FcGoogle /> Sign in with Google</Button>
                            </div>
                        </Col>

                    </Col>
                    <Col md={6} className={`signup ${showSignUp ? 'show' : ''}`}>
                        <Col md={10} className="mx-auto">
                            <Row>
                                <Col className="px-md-3 px-0">
                                    <h2 className="h2">Sign up</h2>
                                    <p className="f-md mb-4">Please fill the information below</p>
                                </Col>
                            </Row>
                            <SignUpForm />
                            <div className="text-center">
                                <p className="mt-3 d-block d-md-none">Already have an account ? <span className="f-lg-bold-sm" onClick={() => setShowSignUp(false)}>Login</span></p>
                            </div>
                            <div className="or-line my-5">
                                <div>Or</div>
                            </div>
                            <div className="text-center">
                                <Button className="btn-google"><FcGoogle /> Sign in with Google</Button>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Index;
