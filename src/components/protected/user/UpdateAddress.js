import React from 'react';
import { Modal } from 'react-bootstrap';
import UpdateAddressForm from './forms/UpdateAddressForm'

const UpdateAddress = (props) => {

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
                <Modal.Title className="ml-auto f-md-bold">Update address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateAddressForm done={(items) => props.done(items)} editItem={props.editItem} />
            </Modal.Body>
        </Modal>
    )

}
export default UpdateAddress;