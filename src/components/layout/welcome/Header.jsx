import React, { Component } from 'react'
import { Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { FaRegUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiShoppingBag } from 'react-icons/bi';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from "react-redux";
import { userAccessToken, setCategoryId } from '../../../js/actions'
import Auth from '../../../general/router/protected/Auth';
import Login from '../../auth/forms/LoginForm';

import { Link } from 'react-router-dom';
import CurrencyStorage from '../../../general/localStorage/CurrencyStorage';
import CartService from '../../../general/services/CartService';

const mapStateToProps = state => ({
    categories: state.categories,
    allSettings: state.allSettings,
    access_token: state.access_token,
    bag: state.bag,
    wishList: state.wishList
})
function mapDispatchToProps(dispatch) {
    return {
        userAccessToken: val => dispatch(userAccessToken(val)),
        setCategoryId: val => dispatch(setCategoryId(val)),
    };
}
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginModal: false,
            activeCurrencyId:''
        }
    }
    componentWillMount() {
        if (Auth.isAuthenticated()) {
            this.props.userAccessToken(Auth.getAccessToken());
        }
    }
    componentDidMount() {
        let activeCurrencyId = CurrencyStorage.loadActiveState();
        this.setState({activeCurrencyId})
    }
    getCartCount() {
        if (this.props.bag.products) {
            return this.props.bag.products.length
        }
    }
    doneLogin(val) {
        this.setState({ showLoginModal: false });
        // this.addToWish(this.state.currentItem)
    }
    categoryClick = (id) => {
        // this.props.setCategoryId(id)
        // ?category_id=${id}
        // history.push('/checkout')
    }
    changeCurrency = (event) => {
        this.setState({activeCurrencyId: event.target.value});
        CurrencyStorage.saveActiveState(event.target.value);
        CartService.clearLocalCart();
        window.location.reload();
    }
    render() {
        return (
            <header>
                <div className="">
                    <div className="top py-2 bg-ta ">
                        <Container className="text-center top">
                            <Row className="f-sm">
                                <div className="col ">
                                    <select name="" id=""
                                        className=" mb-0 float-left currency"
                                        onChange={this.changeCurrency}
                                        value={this.state.activeCurrencyId}>
                                        {this.props.allSettings.currencies &&
                                            this.props.allSettings.currencies.map((item, index) => {
                                                return <option key={`currency-${index}}`} value={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-auto col-9 mx-auto">
                                    <p className="text-center w-100 mb-0 ">Lorem ipsum is simply dummy text of the printing and typesetting industry</p>
                                </div>

                                <div className="col d-none d-lg-block">
                                    {(this.props.allSettings.contact_email && this.props.allSettings.contact_email.content) &&
                                        <p className="text-right mb-0">{this.props.allSettings.contact_email.content}</p>
                                    }
                                </div>
                            </Row>

                        </Container>
                    </div>
                    <div className="center">
                        <Container className="text-center top">
                            <Row className="f-sm py-2 ">
                                <div className="col menu-ico-c">

                                </div>
                                <Link to="/" className="col-auto logo py-2 px-0">
                                    {(this.props.allSettings.logo && this.props.allSettings.logo.content) &&
                                        <img src={this.props.allSettings.logo.content} alt="" className="img-fluid" />
                                    }
                                </Link>
                                <div className="col text-right align-self-center menu">
                                    {this.props.access_token ?
                                        <Link to="/my-account"><FaRegUser /></Link>
                                        :
                                        <Link to="" onClick={() => this.setState({ showLoginModal: true })}><FaRegUser /></Link>
                                    }
                                    <Link to="/search"><FiSearch /></Link>
                                    {this.props.access_token ?
                                        <Link to="/wishlist"><AiOutlineHeart /><span className="f-sm-bold">{this.props.wishList.length ? this.props.wishList.length : ''}</span></Link>
                                        :
                                        <Link to="" onClick={() => this.setState({ showLoginModal: true })}><AiOutlineHeart /><span className="f-sm-bold">{this.props.wishList.length ? this.props.wishList.length : ''}</span></Link>
                                    }
                                    <Link to="/cart"><BiShoppingBag /><span className="f-sm-bold">{this.getCartCount()}</span></Link>

                                </div>
                            </Row>
                            <div className="line"></div>
                        </Container>
                    </div>
                    <div className="bottom">
                        <Container>
                            <Navbar expand="lg">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mx-auto">
                                        {this.props.categories.map((item, index) => {
                                            return <LinkContainer key={index} onClick={() => this.props.setCategoryId(item.id)} to={`/search?category_id=${item.id}`}>
                                                <Nav.Link>{item.name}</Nav.Link>
                                            </LinkContainer>
                                        })}

                                        <LinkContainer to="/aboutus">
                                            <Nav.Link>About</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/contact">
                                            <Nav.Link>Contact</Nav.Link>
                                        </LinkContainer>

                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Container>
                    </div>
                    <Login
                        show={this.state.showLoginModal}
                        onHide={() => this.setState({ showLoginModal: !this.state.showLoginModal })}
                        done={(val) => this.doneLogin(val)}
                        loadWishList={true}
                        loadCart={true}
                        closeBtn={true}
                    />
                </div>
            </header>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
