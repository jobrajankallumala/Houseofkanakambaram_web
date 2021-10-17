import React, { Component } from 'react';
import { connect } from 'react-redux';
import UrlService from '../../../general/services/UrlService';
import HttpService from '../../../general/services/HttpService';
import {
    Row,
    Col,
    Container,
} from 'react-bootstrap';
import SignInForm from '../forms/SignInForm';

function mapStateToProps(state) {
    return {

    };
}

class Index extends Component {
    componentDidMount() {
        // this.loadTestData();
    }

    loadTestData() {
        let items = HttpService.get(UrlService.testUrl())
            .then(response => {
                console.log(response)
            }).catch(errors => {
                console.log('error' + errors)
            });
    }
    render() {
        return (
            <Container className="h-100">
                <Row className="h-100">
                    <Col className="col-auto mx-auto my-auto bg-tlt shadow-sm p-5">
                        <SignInForm />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(Index);