import React from 'react';
import { Modal } from 'react-bootstrap';
import AddReviewForm from './forms/AddReviewForm';

const Review = (props) => {
    return (
        <Modal
            // {...props}
            size="md"
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            className="address-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="ml-auto f-md-bold">Add a review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddReviewForm 
                order_item_id={props.order_item_id}
                product_id={props.product_id}
                done={(val) => props.done(val)} />
            </Modal.Body>
        </Modal>
    );
}

export default Review;
