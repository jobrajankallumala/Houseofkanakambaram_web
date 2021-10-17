import React, { Component } from 'react'
import { Button, Form, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ReactFlagsSelect from 'react-flags-select';
import UrlService from '../../../general/services/UrlService';
import HttpService from '../../../general/services/HttpService';
import Select from 'react-select';
import BtnLoading from '../../../general/lib/BtnLoading';
import ValidationError from '../../../general/lib/validationerror';
import Swal from 'sweetalert2';

export default class AddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            address_id: '',
            address_line_one: '',
            address_line_two: '',
            city: '',
            postal_code: '',
            country_id: '',

            contact_name: '',
            contact_phone: '',
            contact_email: '',
            state: '',
            error: null,
            countries: [],
            errors: {},
            editMode: false
        }
    }
    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        this.setState({ name: value });


        this.setState({ errors, [name]: value });
    };
    handleChangeSelect = (name, selectedOption) => {

        this.setState({ [name]: selectedOption.value });
    }
    handleChangeCountry = (country) => {
        this.setState({ country });
    }
    componentDidMount() {
        this.getAllCountries();
    }
    getAllCountries() {
        let url = UrlService.getAllCountryUrl();
        HttpService.openGet(url)
            .then(response => {
                if (response.data.status) {
                    let list = Object.keys(response.data.data.countries).map((item, index) => {
                        return { value: item, label: response.data.data.countries[item] }
                    })
                    this.setState({ countries: list })
                }
            })
            .catch(error => {

            })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.reset();
        this.setState({ loading: true })
        let url = UrlService.createAddressUrl()
        let data = {
            address_line_one: this.state.address_line_one,
            address_line_two: this.state.address_line_two,
            city: this.state.city,
            postal_code: this.state.postal_code,
            country_id: this.state.country_id,
            contact_name: this.state.contact_name,
            contact_phone: this.state.contact_phone,
            contact_email: this.state.contact_email
        }
        HttpService.post(url, data)
            .then(response => {
                this.setState({ loading: false })
                if (response.status == 422) {
                    this.setErrors(response);
                } else if (response.data.status) {
                    this.props.addedAddress(response.data.data);
                    this.setState({
                        editMode: true,
                        address_id: response.data.data.id
                    })
                }
            })
            .catch(error => {
                this.setState({ loading: false })
                Swal.fire({
                    toast: true,
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try again later.',
                    footer: ''
                })
            })
    }
    handleUpdate = (e) => {
        e.preventDefault();
        this.reset();
        this.setState({ loading: true })
        let url = UrlService.updateAddressUrl()
        let data = {
            address_id: this.state.address_id,
            address_line_one: this.state.address_line_one,
            address_line_two: this.state.address_line_two,
            city: this.state.city,
            postal_code: this.state.postal_code,
            country_id: this.state.country_id,
            contact_name: this.state.contact_name,
            contact_phone: this.state.contact_phone,
            contact_email: this.state.contact_email,
        }
        HttpService.post(url, data)
            .then(response => {
                this.setState({ loading: false })
                if (response.status == 422) {
                    this.setErrors(response);
                } else if (response.data.status) {
                    this.props.doneUpdate(response.data.data, this.state.address_id)
                }
            })
            .catch(error => {
                this.setState({ loading: false });
                Swal.fire({
                    toast: true,
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try again later.',
                    footer: ''
                })
            })
    }
    setErrors(response) {
        this.setState({ errors: response.data.errors });
        return true;
    }
    getKey(key) {
        return this.state.errors[key] !== undefined ? this.state.errors[key][0] : null;
    }
    reset() {
        this.setState({ errors: {} });
        return true;
    }
    render() {
        return (
            <div className="tm-form address-form">
                <Form onSubmit={!this.state.editMode ? this.handleSubmit : this.handleUpdate}>
                    <Row className="row">

                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control value={this.state.contact_name} type="text" name="contact_name" onChange={this.handleChange} v-required="true" v-email="true" v-label="Email" placeholder="Full Name *" />
                            <ValidationError message={this.getKey('contact_name')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control value={this.state.contact_email} type="email" name="contact_email" onChange={this.handleChange} v-required="true" v-email="true" v-label="Email" placeholder="Email *" />
                            <ValidationError message={this.getKey('contact_email')} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control value={this.state.postal_code} type="text" name="postal_code" onChange={this.handleChange} v-required="true" v-email="true" v-label="Email" placeholder="Pincode *" />
                            <ValidationError message={this.getKey('postal_code')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control value={this.state.address_line_one} type="text" name="address_line_one" onChange={this.handleChange} required v-required="true" v-email="true" v-label="Email" placeholder="Address line one *" />
                            <ValidationError message={this.getKey('address_line_one')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control value={this.state.address_line_two} type="text" name="address_line_two" onChange={this.handleChange} required v-required="true" v-email="true" v-label="Email" placeholder="Address line two" />
                            <ValidationError message={this.getKey('address_line_two')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control value={this.state.city} type="text" name="city" onChange={this.handleChange} required v-required="true" v-email="true" v-label="Email" placeholder="City *" />
                            <ValidationError message={this.getKey('city')} />
                        </Form.Group>
                        <Form.Group className="col-sm-12">
                            <Select
                                value={this.state.countries.filter(({ value }) => value == this.state.country_id)}
                                onChange={(selected) => this.handleChangeSelect('country_id', selected)}
                                options={this.state.countries} />
                            {/* <ReactFlagsSelect
                                className="form-control"
                                searchable={true}
                                // ref="userFlag"
                                selected={this.state.country}
                                // defaultCountry='AE'
                                onSelect={this.handleChangeCountry}
                                customLabels={{ "US": "United State Of America" }}
                                searchPlaceholder="Country"
                                placeholder="Select residential country" /> */}
                            <ValidationError message={this.getKey('country_id')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <PhoneInput
                                enableSearch={true}
                                country={'us'}
                                value={this.state.contact_phone}
                                onChange={contact_phone => this.setState({ contact_phone })}
                            />
                            <ValidationError message={this.getKey('contact_phone')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            {!this.state.editMode ?
                                <Button disabled={this.state.loading} type="submit" className="submit">{this.state.loading ? <BtnLoading title="" /> : 'Add'}</Button>
                                :
                                <Button disabled={this.state.loading} type="submit" className="submit">{this.state.loading ? <BtnLoading title="" /> : 'Update'}</Button>
                            }
                        </Form.Group>


                    </Row>
                </Form>

            </div>
        )
    }
}
