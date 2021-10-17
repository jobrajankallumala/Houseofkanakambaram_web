import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import ContactForm from './forms/ContactForm';
import { useSelector } from 'react-redux'


export default function Index() {
    const allSettings = useSelector(state => state.allSettings);
    const getAddress= () => {
        if(allSettings.address && allSettings.address.content) {
            return allSettings.address.content
        }
        return ''
    }
    return (
        <div id="page-contact" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
            <Container className="">
                <h2 className="h3 mb-5 text-center">Contact us</h2>
                <div className="text-center">
                    <p className="f-md mb-4">For any query related to any product, order, shipping or returns, please write to us at
                        <span className="f-md-bold"> support@houseofkanakambaram.com</span></p>

                    <h6 className="f-lg-bold">Location</h6>
                    {(allSettings.address && allSettings.address.content) &&
                        <div className="f-md col-lg-4 col-sm-6 mx-auto">{getAddress()}</div>
                    }
                </div>
                <Row className="my-5">
                    <Col>
                        <img src="/images/assets/house_of_kanakambaram-01.png" className="img-fluid" alt="" />
                    </Col>
                    <Col>
                        <img src="/images/assets/house_of_kanakambaram-02.png" className="img-fluid" alt="" />
                    </Col>
                </Row>
                <div>
                    <h4 className="f-lg-bold mb-5 text-center">Get in Touch</h4>
                    <ContactForm />
                </div>
            </Container>
        </div>
    )
}
