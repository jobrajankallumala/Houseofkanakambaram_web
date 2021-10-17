import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Failed extends Component {
    render() {
        return (
            <div id="page-payment-response" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
                <Container>
                    <Row className="mb-4">
                        <Col className="text-center">
                            <img src="/base/icons/failed.png" width="70" alt="" />
                            <h3 className="h3 mt-3 clr-tm">Your payment was failed</h3>

                            <Link to="/checkout" className=" shop"><Button className="px-5">Try Again</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
