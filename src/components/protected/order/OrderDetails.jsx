import React, { Component } from 'react'
import { Button, Col, Container, Media, Row } from 'react-bootstrap'
import Review from './Review';
import { GoPrimitiveDot } from 'react-icons/go'
import { AiFillStar } from 'react-icons/ai';
import UrlService from '../../../general/services/UrlService';
import HttpService from '../../../general/services/HttpService';

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReviewModal: false,
            details: {
                address: {},
                product: {}
            }
        }
    }
    componentDidMount() {
        this.getDetails();

    }
    getDetails() {
        let url = UrlService.getOrderDetails(this.props.match.params.id);
        HttpService.get(url)
            .then(response => {
                if (response.data.status) {
                    this.setState({ details: response.data.data });
                }
            })
            .catch(error => {

            })
    }

    reviewDone() {
        let obj = Object.assign({}, this.state);
        obj.details.is_rated = true;
        obj.showReviewModal = false;
        this.setState(obj);
    }
    render() {
        const { details } = this.state;
        return (
            <div id="page-order-details" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
                <Container className="">

                    <Row>
                        <Col sm={12} className=" ">
                            <div className="border p-3">
                                <p className="f-md-bold">Delivery Address</p>
                                <p >
                                    {details.address.contact_name}<br />
                                    {details.address.contact_email ? details.address.contact_email : ''}<br />
                                    {details.address.contact_phone}<br />
                                    {details.address.address_line_one}<br />
                                    {details.address.address_line_two}<br />
                                    {details.address.city},
                                    {details.address.postal_code}
                                </p>
                            </div>
                        </Col>
                        <Col className="mt-5">
                            <Row>
                                <Col md={7}>
                                    <Media>
                                        <Media href="#" className="mr-3">
                                            <div className="img-box img-parent">
                                                <img src={details.product.image} alt="" className="img-ch" />
                                            </div>
                                        </Media>
                                        <Media className="d-table">
                                            <h6 className="f-md-bold-sm w-100">{details.product.name}</h6>
                                            <div className="f-md">
                                                <p >{details.product.description}</p>
                                                {details.product.custom_fields != undefined && Object.keys(details.product.custom_fields).length ?
                                                    Object.keys(details.product.custom_fields).map((spec, specIndex) => {
                                                        return <p key={`spec-${specIndex}`} className="mb-0">{spec} : {details.product.custom_fields[spec]}</p>
                                                    })
                                                    : ''}
                                                <p className="f-md-bold-sm mr-2">{details.product.currency} {details.total}</p>
                                            </div>
                                        </Media>
                                    </Media>

                                </Col>
                                <Col md={5} className="mt-4 mt-md-0">
                                    <p className="f-md-bold">
                                        <GoPrimitiveDot />
                                        {/* Deliverd on May 15 */}
                                        Status : {details.current_status}<br />
                                        {details.received != undefined && Object.keys(details.received).length ?
                                            <><span>Order recieved at : {details.received.receved_at}</span><br /></>
                                            : ''}
                                        {details.dispatched != undefined && Object.keys(details.dispatched).length ?
                                            <><span>Dispatched at : {details.dispatched.dispatched_at}</span><br /></>
                                            : ''}
                                        {details.delivery != undefined && Object.keys(details.delivery).length ?
                                            <><span>Deliverd at : {details.delivery.delivered_at}</span><br /></>
                                            : ''}
                                    </p>
                                    {/* <p className="f-md mb-4">Your item has been Deliverd</p> */}
                                    {(details.delivery != undefined && Object.keys(details.delivery).length) ?

                                        !details.is_rated ?
                                            <Button
                                                className="f-md cp btn-rating"
                                                onClick={() => this.setState({ showReviewModal: true })}
                                            ><AiFillStar className="f-xl mr-2" />Rate & Review Product</Button>
                                            : ''
                                        : ''
                                    }
                                    <div className=" mt-4">
                                        <a className="f-md cp btn-rating" href={UrlService.getInvoiceUrl(this.state.details.order_id)}>Download Invoice</a>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Container>

                <Review
                    onHide={() => this.setState({ showReviewModal: false })}
                    show={this.state.showReviewModal}
                    done={(val) => this.reviewDone()}
                    order_item_id={this.props.match.params.id}
                    product_id={details.product.id}
                // item={(item) => this.addItem(item)}
                />
            </div>
        )
    }
}
