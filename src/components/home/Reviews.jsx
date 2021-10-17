import React, { useState, useEffect } from 'react';
import { Col, Container, Media, Nav, Row, Tab } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AiFillStar } from 'react-icons/ai';
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';
import { Link } from 'react-router-dom'


const Reviews = (props) => {
    const [active, setActive] = useState('')
    const [defaultActiveKey, setDefaultActiveKey] = useState('')
    const [items, setItems] = useState([])
    useEffect(() => {
        let url = UrlService.getHomePageReviewsUrl();
        HttpService.openGet(url)
            .then(response => {
                let data = response.data;

                if (response.data.status) {
                    if (data.data.length) {
                        setItems(data.data[0]);
                        if (data.data[0].length) {
                            setDefaultActiveKey(data.data[0][0].rating_id)
                            setActive(data.data[0][0].rating_id)
                        }
                    }

                }
            }).catch(errors => {
                console.log('error' + errors)
            });
    }, []);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4
        }
    };
    const changeItem = (item) => {
        setActive(item)
    }
    const getStars = (n, id) => {
        let stars = [];
        for (var i = 1; i <= n; i++) {
            stars.push(<AiFillStar key={`star-${id}-${i}`} />);
        }
        return stars;
    }
    return (
        <div className="py-4 mt-5 bg-ti reviews">
            <Container>
                <Row className="text-center justify-content-center  pt-5 mb-4">
                    <h3 className="h2">1000+ Happy Customers,<br />
                        here’s what they have to say</h3>


                </Row>
                {defaultActiveKey ?
                    <Col className="px-0">
                        <Tab.Container id="left-tabs-example" defaultActiveKey={defaultActiveKey}>
                            <Row className="pb-5">
                                <Col lg={8} sm={10} className="text-center mx-auto">
                                    {/* <Nav variant="" className=" "> */}
                                    <Carousel
                                        responsive={responsive}
                                    >
                                        {items.map((item, index) => {
                                            if (item.image) {
                                                return <Nav.Item key={`key-${index}`} onClick={() => changeItem(item.rating_id)} className={`${active == item.rating_id ? 'active' : ''}`}>
                                                    <Nav.Link eventKey={item.rating_id} className="">
                                                        <div className="img-parent img-box">
                                                            <img src={item.image} alt={item.product_name} className="img-ch" />
                                                        </div>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            }
                                        })}

                                    </Carousel>
                                </Col>
                                <Col lg={12} className="mt-5">
                                    <Tab.Content>
                                        {items.map((item, index) => {
                                            if (item.image) {
                                                return <Tab.Pane eventKey={item.rating_id} key={`val-${item.rating_id}`}>
                                                    <Media>
                                                        <Link to={`/product/${item.product_id}`}>
                                                            <img
                                                                width={100}
                                                                className="mr-4"
                                                                src={item.image}
                                                                alt="Generic placeholder"
                                                            />
                                                        </Link>
                                                        <Media.Body>
                                                            <h5 className="f-lg-bold-sm">{item.product_name}</h5>
                                                            <div className="stars">
                                                                {getStars(item.rating, item.rating_id)}

                                                            </div>
                                                            <p>
                                                                {item.rating_description}
                                                            </p>
                                                        </Media.Body>
                                                    </Media>
                                                </Tab.Pane>
                                            }
                                        })}

                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Col>
                    : ''}
            </Container>
        </div>
    )
}

export default Reviews;