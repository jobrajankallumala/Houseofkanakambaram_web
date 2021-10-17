import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from "react-redux";


const Categories = (props) => {
    const ltRef = useRef(null);
    const [ltHeight, setHeight] = useState('');
    const isTab = useMediaQuery({ query: `(max-width: 991px)` });
    const categories = useSelector(state => state.categories);
 
    useEffect(() => {
        if (ltRef.current) {
            let height = ltRef.current.offsetHeight;
            setHeight(height)
        }
    })
    return (
        <div className="categories-section">
            <Container className="mt-5 pt-md-4 mb-3">
                <Row className="bg-tlt">
                    <Col lg={7}>
                        <Row>
                            <Col md={7} className="text-left align-self-center">
                                <h3 className="h1">Category</h3>
                                <p className="f-md">Shop by category</p>
                            </Col>
                            <Col md={5} className="d-lg-block d-none">
                                <div className="px-3 img-parent box-primary">
                                    <img src={`/images/products/product-05.jpg`} alt="" className="img-ch" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={5} className="d-lg-block d-none">
                        <Row>
                            <Col md={6} className="">
                                <div className="px-3 img-parent box-primary">
                                    <img src={`/images/products/product-05.jpg`} alt="" className="img-ch" />
                                </div>
                            </Col>
                            <Col md={6} className="">
                                <div className="px-3 img-parent box-primary">
                                    <img src={`/images/products/product-05.jpg`} alt="" className="img-ch" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Row className={`${!isTab ? 'bg' : ''} bg-tc`}>
                <Container>
                    <Row>
                        <Col lg={7} className="" ref={ltRef}>

                            <Row>
                                <Col xs={6} lg={5} className="py-4">
                                    <div className="py-5 ml-3 ml-sm-0">
                                        <img src="/base/logo/logo-01.svg" alt="" width="100" />
                                        <p className="f-md mt-4 clr-tlt">Lorem Ipsum is dummy text</p>
                                    </div>
                                </Col>
                                <Col xs={6} lg={7} className="h5 categories pl-0">
                                    <div className="bg-tc py-5 mr-3 mr-sm-0">
                                        <ul className="py-4 px-0 m-0">
                                            {categories.map((item, index) => {
                                                return <li key={index}>
                                                    <Link to={`/search?category_id=${item.id}`}>{item.name}</Link>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={5} className="rt d-lg-block d-none" style={{ height: ltHeight }}>
                            <Row className="h-100">
                                <Col>
                                    <div className="img-parent img-01">
                                        <img src="/images/products/product-06.jpg" alt="" className="img-ch" />
                                    </div>
                                    <div className="img-parent img-02">
                                        <img src="/images/products/product-07.jpg" alt="" className="img-ch" />
                                    </div>
                                </Col>
                                <Col>
                                    <div className="img-parent img-03">
                                        <img src="/images/products/product-08.jpg" alt="" className="img-ch" />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </div>
    );
}

export default Categories;
