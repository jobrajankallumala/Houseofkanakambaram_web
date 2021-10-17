import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Gallery from './Gallery';
import Descriptions from './Descriptions';
import Item from './Item';
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';
import CurrencyStorage from '../../general/localStorage/CurrencyStorage';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            images: [],
            related_items: [],
            filter: {
                except_product_id: '',
                currency_id: 1,
                category_id: '',
                filter_by: 'created_at',
                order_by: 'desc',
                price_min: 0,
                price_max: 100000,
                limit: 8,
                page:1
            },
        }
    }

    componentDidMount() {
        let obj = Object.assign({}, this.state);
        obj.filter.except_product_id = this.props.match.params.id;
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        if(activeCurrencyId) {
            obj.filter['currency_id'] = activeCurrencyId;
        }
        this.setState(obj)

        this.getItem();
    }
    getRelatedItem() {
        this.setState({ loadingItems: true })
        let url = UrlService.searchProductsUrl();
        let items = HttpService.get(url +
            "?page=1", this.state.filter)
            .then(response => {
                this.setState({ loadingItems: false })
                let data = response.data;

                if (response.data.status) {
                    this.setState({ related_items: data.data.products.data });
                }
            }).catch(errors => {
                this.setState({ loadingItems: false })
                console.log('error' + errors)
            });
    }
    getItem(id = null) {
        this.setState({ loadingItems: true })
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        let params = {}
        if(activeCurrencyId) {
            params.currency_id = activeCurrencyId;
        }

        let url = UrlService.getProductsUrl(id != null ? id : this.props.match.params.id);
        let item = HttpService.get(url, params)
            .then(response => {
                this.setState({ loadingItems: false })
                let data = response.data;

                if (response.data.status) {
                    let obj = Object.assign({}, this.state);
                    obj['item'] = data.data
                    // this.setState({ item: data.data });
                    let images = data.data.images.map((item, index) => {
                        return {
                            original: item,
                            thumbnail: item,
                        }
                    });
                    obj['images'] = images;
                    obj.filter['category_id'] = data.data.category_id;
                    // this.setState({ images });
                    this.setState(obj);
                    this.getRelatedItem();
                }
            }).catch(errors => {
                this.setState({ loadingItems: false })
                console.log('error' + errors)
            });
    }
    loadNextProduct(id) {
        let obj = Object.assign({}, this.state);
        obj.filter.except_product_id = id;
        this.setState(obj);
        
        this.getItem(id);
    }
    render() {
        const { item } = this.state;
        return (
            <div id="page-product-view" className="pt-md-5 mt-md-4 mb-4 pb-5 pt-0 mt-0 text-center text-md-left">
                <Container>
                    <Row className="">
                        <Col md={6}>

                            <Gallery data={this.state.images} />
                        </Col>
                        <Col md={6}>
                            <Descriptions data={item} />
                        </Col>
                        <Col sm={12} >
                            <div className="border-bottom"></div>
                        </Col>
                    </Row>
                    <div className="product-listing mt-c2">
                        <Row className="items">
                            {this.state.related_items.length > 0 ? this.state.related_items.map((item, index) => {
                                return <Item
                                    key={index}
                                    data={item}
                                    loadNextProduct={(id) => this.loadNextProduct(id)} />
                            }) : ''}


                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}
