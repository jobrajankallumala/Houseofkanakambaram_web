import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { BiFilterAlt } from 'react-icons/bi';
import { RiCloseFill } from 'react-icons/ri'
import Select from 'react-select';
import Filter from './Filter';
import Item from './Item';
import Pagination from '../../general/lib/pagination';
import UrlService from '../../general/services/UrlService';
import HttpService from '../../general/services/HttpService';
import { setCategoryId } from '../../js/actions'
import { connect } from "react-redux";
import queryString from 'query-string';
import History from '../../general/lib/history';
import CurrencyStorage from '../../general/localStorage/CurrencyStorage';

const mapStateToProps = state => ({
    categories: state.categories,
    category_id: state.category_id
})

function mapDispatchToProps(dispatch) {
    return {
        setCategoryId: val => dispatch(setCategoryId(val)),
    };
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            category: {},
            filter_by: 'created_at',
            filter: {
                currency_id: 1,
                category_id: '',
                tag_id: '',
                filter_by: 'created_at',
                tag_string: '',
                order_by: 'desc',
                price_min: 0,
                price_max: 100000,
                limit: 12,
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
                filter: {},
            },
            items: []
        }
        this.paginate = this.paginate.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeMaxPrice = this.changeMaxPrice.bind(this);
    }

    componentDidUpdate() {
        let obj = Object.assign({}, this.state);

        // manage category change from header
        if (this.props.category_id) {
            obj.filter['category_id'] = this.props.category_id;
            obj.filter['tag_string'] = '';
            obj.filter['tag_id'] = '';
            obj.pagination['currentPage'] = 1;
            this.setState(obj);
            this.getItems();

            let params = this.state.filter;
            params.page = 1;
            const url = this.setParams(params);
            History.push(`search?${url}`);
            this.props.setCategoryId('')
        }
    }

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        let obj = Object.assign({}, this.state);
        
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        if(activeCurrencyId) {
            obj.filter['currency_id'] = activeCurrencyId;
        }
        if (query.category_id) {
            obj.filter['category_id'] = query.category_id;
        }
        if (query.filter_by) {
            obj.filter['filter_by'] = query.filter_by;
        }
        if (query.order_by) {
            obj.filter['order_by'] = query.order_by;
        }
        if (query.tag_id) {
            obj.filter['tag_id'] = query.tag_id;
        }
        if (query.price_min) {
            obj.filter['price_min'] = query.price_min;
        }
        if (query.price_max) {
            obj.filter['price_max'] = query.price_max;
        }
        if (query.tag_string) {
            obj.filter['tag_string'] = query.tag_string;
        }
        if (query.page) {
            obj.pagination['currentPage'] = query.page;
        }
        this.setState(obj)
        this.getItems();
        this.props.setCategoryId('')
    }
    setParams(obj) {
        const searchParams = new URLSearchParams(window.location.search);
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                searchParams.set(key, obj[key]);
            }
        }

        return searchParams.toString();
    }
    toggleFilter = () => {

        this.setState({ showFilter: !this.state.showFilter });
    }
    configpagination(data) {
        let obj = Object.assign({}, this.state);
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
        let obj = Object.assign({}, this.state);
        obj.pagination['currentPage'] = page;
        obj.filter['page'] = page;
        this.setState(obj);

        this.getItems();

        let params = this.state.filter;
        const url = this.setParams(params);
        History.push(`search?${url}`);
        // const url = this.setParams({ page: page });
        // History.push(`search?${url}`);
    }
    getItems(query = {}) {
        // this.props.loadSearch(false)
        this.setState({ loadingItems: true })
        let paginationData = this.state.paginationData;
        // paginationData.filter = query;
        paginationData.draw++;
        let url = UrlService.searchProductsUrl();
        let items = HttpService.openGet(url,this.state.filter)
            .then(response => {
                this.setState({ loadingItems: false })
                let data = response.data;

                if (response.data.status) {
                    this.setState({ items: data.data.products.data });
                    this.configpagination(data.data.products);
                }
            }).catch(errors => {
                this.setState({ loadingItems: false })
                console.log('error' + errors)
            });

    }
    changeMaxPrice(value) {
        let obj = Object.assign({}, this.state);
        obj.filter['price_max'] = value;
        obj.pagination['currentPage'] = 1;
        this.setState(obj);
        this.getItems();

        let params = this.state.filter;
        params.page = 1;
        const url = this.setParams(params);
        History.push(`search?${url}`);
        this.toggleFilter();

        // const url = this.setParams({ price_max: value, page: 1 });
        // History.push(`search?${url}`);

    }
    changeCategory(id = null) {
        let obj = Object.assign({}, this.state);
        if (id) {
            let category = this.props.categories.find(item => item.id == id);
            if (Object.keys(category).length) {
                obj.filter['category_id'] = id;
                obj.filter['tag_id'] = '';
                obj.filter['tag_string'] = '';
                obj.pagination['currentPage'] = 1;
                obj.category = category;
                this.setState(obj);
                this.getItems();

                let params = this.state.filter;
                params.page = 1;
                const url = this.setParams(params);
                History.push(`search?${url}`);
                // const url = this.setParams({ category_id: id, page: 1 });
                // History.push(`search?${url}`);
            }
        } else {
            obj.filter['category_id'] = '';
            obj.filter['tag_id'] = '';
            obj.pagination['currentPage'] = 1;
            obj.filter['tag_string'] = '';
            obj.category = {};
            this.setState(obj);
            this.getItems();

            let params = this.state.filter;
            params.page = 1;
            const url = this.setParams(params);
            History.push(`search?${url}`);
            // const url = this.setParams({ category_id: '', page: 1 });
            // History.push(`search?${url}`);
        }
        this.toggleFilter();
    }
    handleChangeSort(name, selectedOption) {
        let filterBy = 'created_at';
        let orderBy = 'desc';
        let obj = Object.assign({}, this.state);
        if (selectedOption.value == 'price-01') {
            filterBy = 'price'
            orderBy = 'asc'
        } else if (selectedOption.value == 'price-10') {
            filterBy = 'price'
            orderBy = 'desc'
        } else {
            filterBy = selectedOption.value
            orderBy = 'desc'
        }
        obj.filter['filter_by'] = filterBy;
        obj.filter['order_by'] = orderBy;
        obj['filter_by'] = selectedOption.value;
        this.setState(obj);
        this.getItems();

        let params = this.state.filter;
        params.page = 1;
        const url = this.setParams(params);
        History.push(`search?${url}`);
        // const url = this.setParams({ filter_by: filterBy, order_by: orderBy });
        // History.push(`search?${url}`);

    };
    render() {
        const { query, pagination, items } = this.state;
        return (
            <div id="page-products" className="py-2 pt-lg-5 pb-md-5 mb-xs-4 mb-5">
                {this.props.category_id}
                <Container>
                    <Row className="mb-4">
                        {Object.keys(this.state.category).length ?
                            <h6 className="h6 mb-0 col align-self-center">{this.state.category.name}</h6>
                            : ''}
                        <div className="col-lg-3 col-md-4 col-6 px-0 ml-auto">
                            <Select
                                value={sortOptions.filter(({ value }) => value == this.state.filter_by)}
                                onChange={(selected) => this.handleChangeSort('sort', selected)}
                                options={sortOptions} />
                        </div>
                        <div className="col-auto d-block d-lg-none">
                            <div className="filter-ico cp" onClick={() => this.toggleFilter()}>
                                <BiFilterAlt />
                            </div>
                        </div>
                        <Col sm={12} >
                            <div className="line mt-3"></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} className={`filter d-none d-lg-block ${this.state.showFilter ? 'show' : ''}`}>
                            <div className="filter-close-ico d-block d-lg-none cp" onClick={() => this.toggleFilter()}>
                                <RiCloseFill />
                            </div>
                            <Filter
                                category_id={this.state.filter.category_id}
                                tag_id={this.state.filter.tag_id}
                                tag_string={this.state.filter.tag_string}
                                changeCategoryId={(id) => this.changeCategory(id)}
                                changeMaxPrice={(val) => this.changeMaxPrice(val)}
                                price_max={this.state.filter.price_max}
                            />
                        </Col>
                        <Col lg={9} className="">
                            <Row className="items">
                                {items.length > 0 ? items.map((item, index) => {
                                    return <Item key={index} data={item} />
                                }) : <p className="text-center w-100">No items found.</p>}

                            </Row>
                        </Col>
                    </Row>
                    <Pagination
                        pagination={pagination}
                        //   @paginate="loadItems()"
                        paginate={this.paginate}
                        offset="4" />
                </Container>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)

const sortOptions = [
    // { value: 'created_at', label: 'Sort by popularity' },
    { value: 'avg_rating', label: 'Sort by average rating' },
    { value: 'created_at', label: 'Sort by latest' },
    { value: 'price-01', label: 'Sort by price: low to high' },
    { value: 'price-10', label: 'Sort by price: high to low' },
]
