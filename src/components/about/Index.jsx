import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { RiPlayLine } from 'react-icons/ri'

const Index = () => {
    return (
        <div id="page-about" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
            <Container>
                <Col className="text-center">
                    {/* <h1 className="h2 mb-4">Lorem Ipsum Handlooms <span className="clr-ta">&</span> Loren Ipsum</h1> */}
                    <h1 className="h2 mb-4">About Us</h1>
                    <p className="f-lg mb-3">
                        <b>House of Kanakambaram (HOK)</b> is a craft-based online store started with an initiative to promote traditional handicraft and handloom products. Through this, we provide both the artisans and weavers a platform to showcase their skills and sell their products to earn a living out of it.
                    </p>
                    <p className="f-lg">
                        We focus on handloom sarees and kurtas from various parts of the country which are unique by the type of weaving and with the prints they are having. HOK helps handloom lovers to have a personalized buying experience and brings these traditional handmade products to the public attention.
                    </p>
                </Col>
                <Row className="mt-5">
                    <Col sm={6} className="mb-sm-0 mb-3">
                        <img src="/images/assets/house_of_kanakambaram-01.png" className="img-fluid" alt="" />
                    </Col>
                    <Col sm={6}>
                        <img src="/images/assets/house_of_kanakambaram-02.png" className="img-fluid" alt="" />
                    </Col>
                </Row>
                <Col className="text-center my-5">
                    {/* <h1 className="h2 mb-4">Lorem Ipsum Handlooms</h1> */}

                    <p className="f-lg mb-3">
                        We have sarees from Mangalagiri and Peddapuram, which are the very famous weaving villages of Andhra Pradesh. In handicrafts, we are connected with the artisans who are experts in making traditional handmade jewelry. We offer them a digital platform that connects with the customers of the entire nation and lets them establish the business from any rural village of the country.
                    </p>
                    <p className="f-lg">
                        Let it be handloom or handicraft products, we at HOK are confident enough to deliver the authentic handmade products that you will love along with contributing to such an immense cause.
                    </p>
                </Col>
                <Col lg={10} className=" mx-auto">
                    <div className="img-parent video ">
                        <img src="/images/assets/house_of_kanakambaram-03.png" alt="" className="img-ch" />
                        <div className="play">
                            <RiPlayLine />
                        </div>
                    </div>
                </Col>
            </Container>
        </div>
    );
}

export default Index;
