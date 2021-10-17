import React from 'react';
import { Modal } from 'react-bootstrap';
import AddAddressForm from './forms/AddAddressForm'

const NewAddress = (props) => {

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
                <Modal.Title className="ml-auto f-md-bold">Add a new address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddAddressForm done={(address) => props.done(address)} />
            </Modal.Body>
        </Modal>
    )

}
export default NewAddress;