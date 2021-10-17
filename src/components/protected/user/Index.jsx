import React, { Component } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Item from './Item';
import Address from './Address';
import { connect } from "react-redux";
import { userAccessToken, addToCart, addToWishList } from '../../../js/actions/index'
import UserService from '../../../general/services/UserService';
import History from '../../../general/lib/history';
import UrlService from '../../../general/services/UrlService';
import HttpService from '../../../general/services/HttpService';
import AuthService from '../../../general/services/AuthService';
import CartService from '../../../general/services/CartService';
import Pagination from '../../../general/lib/pagination';

const mapStateToProps = state => ({
    access_token: state.access_token
})
function mapDispatchToProps(dispatch) {
    return {
        userAccessToken: status => dispatch(userAccessToken(status)),
        addToCart: val => dispatch(addToCart(val)),
        addToWishList: val => dispatch(addToWishList(val)),
    };
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
            filter: {
                order_by: 'desc',
                limit: 10,
                page: 1
            },
            pagination: {
                lastPage: "",
                currentPage: "",
                total: 0,
                lastPageUrl: "",
                nextPageUrl: "",
                prevPageUrl: "",
                from: "",
                to: ""
            },
            paginationData: {
                pos: props.currentPos,
                draw: 0,
                length: 10,
                search: "",
                column: 0,
                dir: "desc",
                filter: { },
            },
        }
        this.paginate = this.paginate.bind(this);
    }
    componentDidMount() {
        this.getUserOrder();
    }
    getUserOrder() {
        let url = UrlService.getUserOrderUrl();
        HttpService.get(url, this.state.filter)
            .then(response => {
                this.setState({ loadingItems: false })
                let data = response.data;

                if (response.data.status) {
                    this.setState({ orderItems: data.data.data });
                    this.configpagination(data.data);
                }
            }).catch(errors => {
                this.setState({ loadingItems: false })
                console.log('error' + errors)
            });
    }
    configpagination(data) {
        let obj = Object.assign({ }, this.state);
        obj.pagination['lastPage'] = data.last_page;
        obj.pagination['currentPage'] = data.current_page;
        obj.pagination['total'] = data.total;
        obj.pagination['lastPageUrl'] = data.last_page_url;
        obj.pagination['nextPageUrl'] = data.next_page_url;
        obj.pagination['prevPageUrl'] = data.prev_page_url;
        obj.pagination['from'] = data.from;
        obj.pagination['to'] = data.to;
        this.setState(obj);
    }
    paginate(page) {
        let obj = Object.assign({ }, this.state);
        obj.pagination['currentPage'] = page;
        obj.filter['page'] = page;
        this.setState(obj);

        this.getUserOrder()
    }
    async logOut() {

        await AuthService.logOut();
        this.props.userAccessToken('');
        UserService.removeUser();

        // remove cart
        this.props.addToCart({ });
        CartService.clearLocalCart();

        // remove wishlist
        this.props.addToWishList([]);
        History.push("/");
    }
    render() {
        const { pagination, orderItems } = this.state
        return (
            <div id="page-my-account" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
                <Container className="">
                    <h2 className="h3 mb-5 text-center">My Account</h2>
                    <Row>
                        <Col md={8} className="">
                            {/* <h6 className="f-md-bold mb-5">Welcome back, Jason Simon!</h6> */}
                            <h6 className="f-lg-bold mb-3 border-bottom pb-3">My Orders</h6>
                            <div className="table-container">
                                <Table >

                                    <tbody>
                                        {orderItems.length > 0 ? orderItems.map((item, index) => {
                                            return <Item key={index} data={item} />
                                        }) : <tr></tr>}
                                    </tbody>

                                </Table>
                                <p className="text-center">
                                    {orderItems.length > 0 ?
                                        ''
                                        : 'No order yet.'}
                                </p>
                            </div>
                            <Pagination
                                pagination={pagination}
                                //   @paginate="loadItems()"
                                paginate={this.paginate}
                                offset="4" />

                        </Col>
                        <Col md={4}>
                            <h6 className="f-md-bold mb-md-5 mb-3 mt-4 mt-md-0">My Address</h6>
                            <Address />
                        </Col>
                        <Col>
                            <p className="f-md-bold mb-0 cp mt-5" onClick={() => this.logOut()}>Logout</p>
                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)