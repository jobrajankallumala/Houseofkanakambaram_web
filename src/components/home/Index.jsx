import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import NewLaunches from './NewLaunches';
import Categories from './Categories';
import Trendings from './Trendings';
import BestProducts from './BestProducts';
import Reviews from './Reviews';
import { Link } from 'react-router-dom';
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preferences: []
        }
    }
    componentDidMount() {
        this.getPreferences();
    }
    getPreferences() {
        let url = UrlService.getPreferenceUrl();
        HttpService.openGet(url)
            .then(response => {
                if (response.data.status) {
                    this.setState({ preferences: response.data.data });
                }
            })
            .catch(error => {

            })
    }
    render() {
        return (
            <div id="page-home" className="">
                <Container>
                    <Row className="banner">
                        {this.state.preferences.map((item, index) => {
                            if (item.order == 1) {
                                return <Col key={index} md={6} className="item-01 mb-3 mb-md-0">
                                    <Link to={`/search?tag_id=${item.id}`} className="pre-item-box img-parent">
                                        <img src={item.image} alt="" className="img-ch" />
                                        <div className="t-sn">Shop Now</div>
                                        <div className="t-ht">{item.name}</div>
                                    </Link>
                                </Col>
                            }
                        })}

                        <Col >
                            {this.state.preferences.map((item, index) => {
                                if (item.order == 2) {
                                    return <Col key={`index-${index}`} className="d-grid item-02 px-0" >
                                        <Link to={`/search?tag_id=${item.id}`} className="img-parent pre-item-box">
                                            <img src={item.image} alt="" className="img-ch" />
                                            <div className="t-ht">{item.name}</div>
                                        </Link>
                                    </Col>
                                }
                                if (item.order == 3) {
                                    return <Col key={`index-${index}`} className="d-grid item-03 px-0">
                                        <Link to={`/search?tag_id=${item.id}`} className="d-flex align-items-end img-parent pre-item-box">
                                            <img src={item.image} alt="" className="img-ch" />
                                            <div className="t-ht">{item.name}</div>
                                        </Link>

                                    </Col>
                                }
                            })}


                        </Col>
                    </Row>
                    <Row className="text-center mt-5 pt-2">
                        <Col>
                            {/* <h2 className="h2">Lorem Ipsum Handlooms <span className="clr-ta">&</span> Lorem Ipsum</h2> */}
                            <h2 className="h2">Handcrafted to excellence</h2>
                            <p className="f-md mt-4">At House of Kanakambaram, we create a world of handmade treasures with skilled artisans and weavers from the interiors of India. Get the authentic handloom sarees and traditional jewelries at HOK.</p>
                        </Col>
                    </Row>
                    <NewLaunches />
                </Container >
                <Categories />
                <Container>
                    <Trendings />
                    <BestProducts />

                </Container>
                <Reviews />

            </div >
        )
    }
}
