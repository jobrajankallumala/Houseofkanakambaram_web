import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Item from "./Item";
import { BsArrowRight } from 'react-icons/bs';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';
import { Link } from 'react-router-dom'

const BestProducts = () => {
    const [filter, setFilter] = useState({
        currency_id: 1,
        category_id: '',
        tag_id: '',
        filter_by: 'created_at',
        order_by: 'desc',
        tag_string: 'best_selling',
        limit: 4,
        price_min: 0,
        price_max: 100000,
        page: 1
    })
    const [items, setItems] = useState([])
    useEffect(() => {
        let url = UrlService.searchProductsUrl();
        HttpService.openGet(url, filter)
            .then(response => {
                let data = response.data;

                if (response.data.status) {
                    // setItemes(data.data.products.data);
                    setItems(data.data.products.data);
                    // console.log(items)
                }
            }).catch(errors => {
                console.log('error' + errors)
            });
    }, []);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            partialVisibilityGutter: 10
        },
        mobile: {
            breakpoint: { max: 768, min: 567 },
            items: 2,
            partialVisibilityGutter: 10
        },
        mobileSm: {
            breakpoint: { max: 567, min: 0 },
            items: 1,
            partialVisibilityGutter: 100
        }
    };
    return (
        <Row className="text-center mt-5 pt-4">
            <Col className="px-0 mx-3" style={{ 'overflow': 'hidden' }}>
                <h3 className="h2 mb-5">Best Selling Products</h3>
                <Carousel responsive={responsive}
                    partialVisible={true}
                    containerClass="product-items mb-5 row">
                    {items.length ? items.map((item, index) => {
                        return <Item key={index} data={item} />
                    }) : <div></div>}
                </Carousel>
                <Row className="justify-content-center">
                    <Link to="/search?filter_by=created_at&order_by=desc&tag_string=best_selling" className=" btn-default">See All <BsArrowRight /></Link>
                </Row>
            </Col>

        </Row>
    );
}

export default BestProducts;
