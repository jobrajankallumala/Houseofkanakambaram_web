import React, { Component } from 'react'
import { Button, Form, Row } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import HttpService from '../../../general/services/HttpService';
import UrlService from '../../../general/services/UrlService';
// import Errors from '../../../general/services/Errors';
import ValidationError from '../../../general/lib/validationerror';
import Swal from 'sweetalert2';

export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // apiErrors: Errors,
            errors: {},
            loading: false,
            name: '',
            phone: '',
            email: '',
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState({ [name]: value });

    };
    handleSubmit(event) {
        event.preventDefault();
        this.reset();
        this.setState({ loading: true })
        let url = UrlService.contactUrl();
        HttpService.openPost(url, {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            message: this.state.message,
        })
            .then(response => {
                this.setState({ loading: false });
                if (response.status == 422) {
                    this.setErrors(response);
                } else {
                    Swal.fire({
                        title: 'Contact request success, will touch with you soon',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })

                    this.resetForm();
                }
            })
            .catch(errors => {
                this.setState({ loading: false });
                Swal.fire({
                    toast: true,
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try again later.',
                    footer: ''
                })
            });
    }
    resetForm() {
        this.setState({
            name: '',
            phone: '',
            email: '',
            message: ''
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
        const { loading } = this.state;
        return (
            <div className="tm-form contact-form">
                <Form onSubmit={this.handleSubmit}>
                    <Row className="row">
                        <Form.Group controlId="formBasicEmail" className="col-sm-6" >
                            <Form.Control value={this.state.name} type="text" name="name" onChange={this.handleChange} required v-required="true" v-email="true" v-label="Email" placeholder="Full Name *" />
                            <ValidationError message={this.getKey('name')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-6" >
                            <PhoneInput
                                enableSearch={true}
                                country={'us'}
                                value={this.state.phone}
                                onChange={phone => this.setState({ phone })}
                            />
                            <ValidationError message={this.getKey('phone')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control value={this.state.email} type="email" name="email" onChange={this.handleChange} required v-required="true" v-email="true" v-label="Email" placeholder="Email *" />
                            <ValidationError message={this.getKey('email')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control as="textarea" rows={3} value={this.state.message} type="text" name="message" onChange={this.handleChange} required v-required="true" v-email="true" v-label="Email" placeholder="Message *" />
                            <ValidationError message={this.getKey('message')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12 text-center mb-0" >
                            <Button type="submit" className="submit" >{loading ? 'Submiting' : 'Submit'}</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        )
    }
}

