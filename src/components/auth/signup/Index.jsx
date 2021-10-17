import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    Container,
} from 'react-bootstrap';
import SignUpForm from '../forms/SignUpForm';

function mapStateToProps(state) {
    return {

    };
}

class Index extends Component {
    render() {
        return (
            <Container className="h-100">
                <Row className="h-100">
                    <Col className="col-auto mx-auto my-auto bg-tlt shadow-sm p-5">
                        
                        <SignUpForm />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(Index);