import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import ValidationError from '../../../../general/lib/validationerror';
import StarRating from '../../../../general/lib/StarRating'
import HttpService from '../../../../general/services/HttpService';
import UrlService from '../../../../general/services/UrlService';
import Swal from 'sweetalert2';
import { FaCamera } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';

export default class AddReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            order_item_id: '',
            rating: '',
            message: '',
            product_id: '',
            images: [],
            errors: {},
        }
    }
    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
    setRating = rating => {
        this.setState({ rating: rating });
    };
    handleChangeFile = event => {
        const fileList = Array.from(event.target.files);
        this.setState({ images: fileList });
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.reset();
        this.setState({ loading: true })
        let url = UrlService.createReviewUrl();

        let formData = new FormData();
        this.state.images.forEach(file => {
            formData.append('images[]', file)
            // this.getBase64(file).then(
            //     data => formData.append('images[]', data)
            // );
        })
        formData.append('order_item_id', this.props.order_item_id);
        formData.append('rating', this.state.rating);
        formData.append('message', this.state.message);
        formData.append('product_id', this.props.product_id);
        formData.append('images', this.state.images);

        HttpService.post(url, formData)
            .then(response => {
                this.setState({ loading: false })
                if (response.status == 422) {
                    this.setErrors(response);
                } else if (response.status == 401) {
                    if (!response.data.status) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'You have already added your comments.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.props.done(true)
                    }
                } else if (response.data.status) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Thanks for your valuable comments.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.props.done(true)
                } else {
                    Swal.fire({
                        toast: true,
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: ''
                    })
                }
            })
            .catch(error => {
                this.setState({ loading: false });
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
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
    removeFile(index) {
        let items = this.state.images;
        items.splice(index, 1);
        this.setState({ images: items })
    }
    render() {
        return (
            <div className="tm-form review-form">
                <Form onSubmit={this.handleSubmit}>
                    <Row className="row">

                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Form.Control as="textarea" rows={3} value={this.state.message} type="text" name="message" onChange={this.handleChange} required v-required="true" v-email="true" v-label="Email" placeholder="Message *" />
                            <ValidationError message={this.getKey('message')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicFile" className="col-sm-12">
                            <Form.Label>Attach Image</Form.Label>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <div className="align-self-center">
                                    <FaCamera className="mr-2" /> Add Picture
                                </div>
                            </label>

                            <input type="file" id="file-upload" className="w-100" max="4" onChange={this.handleChangeFile} name="files" multiple accept="image/gif,image/jpeg,image/jpg,image/png" />
                            {/* <small id="emailHelp" className="form-text text-muted">*Maximum 4 picture can upload </small> */}
                            <Col className="mt-3">
                                <Row>

                                    {this.state.images != undefined ? this.state.images.map((item, index) => {
                                        return <Col key={index} className="img-box">
                                            <RiCloseLine onClick={() => this.removeFile(index)} />
                                            <img src={URL.createObjectURL(item)} alt="" className="img-fluid" />
                                        </Col>
                                    }) : ''}
                                </Row>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12 text-center" >
                            <StarRating
                                numberOfStars="5"
                                currentRating="0"
                                onClick={this.setRating}
                            />
                            <ValidationError message={this.getKey('rating')} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="col-sm-12" >
                            <Button disabled={this.state.loading ? true : false} className="submit" type="submit">{this.state.loading ? 'Submiting' : 'Add review'}</Button>
                        </Form.Group>

                    </Row>
                </Form>
            </div>
        )
    }
}
