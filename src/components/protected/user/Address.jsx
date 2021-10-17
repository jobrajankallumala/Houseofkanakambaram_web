import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import HttpService from '../../../general/services/HttpService';
import UrlService from '../../../general/services/UrlService';
import NewAddress from './NewAddress';
import UpdateAddress from './UpdateAddress';

const Address = () => {
    const [currentAddress, setCurrentAddress] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showUpdateAddressModal, setShowUpdateAddressModal] = useState(false);
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        getAllAddress();
    }, []);
    const getAllAddress = () => {
        let url = UrlService.getAllUserAddressUrl();
        HttpService.get(url)
            .then(response => {
                if (response.data.status) {
                    setAddresses(response.data.data)
                }
            })
            .catch(error => {

            })
    }
    const doneAddAddress = (address) => {
        setShowAddressModal(false);
        getAllAddress();
    }
    const doneUpdateAddress = (items) => {
        setShowUpdateAddressModal(false);
        setAddresses(items)
    }

    const removeAddress = (item) => {
        let url = UrlService.deleteUserAddressUrl(item.id)
        HttpService.get(url)
            .then(response => {
                if (response && response.data.status) {
                    setAddresses(response.data.data)
                }
            })
            .catch(error => {

            })
    }
    const editAddress = (item) => {
        setShowUpdateAddressModal(true);
        setCurrentAddress(item);
    }
    return (
        <div className="address">
            <Card className="">
                <Card.Body >
                    <p className="f-md-bold">Delivery Address</p>
                    {addresses.map((item, index) => {
                        return <div key={index} className="f-sm border-bottom py-3">
                            <AiFillDelete
                                onClick={() => removeAddress(item)}
                                className="float-right f-lg clr-tdk cp" />
                            <FiEdit
                                onClick={() => editAddress(item)}
                                className="float-right f-lg clr-tdk cp mr-2" />
                            <p >
                                {item.contact_name}<br />
                                {item.contact_email ? item.contact_email : ''}<br />
                                {item.contact_phone}<br />
                                {item.address_line_one}<br />
                                {item.address_line_two}<br />
                                {item.city},
                                {item.postal_code}
                            </p>

                        </div>
                    })}
                </Card.Body>
            </Card>
            <Button
                onClick={() => setShowAddressModal(true)}
                className="btn">Add New Address</Button>

            <NewAddress
                onHide={() => setShowAddressModal(false)}
                show={showAddressModal}
                done={(address) => doneAddAddress(address)}
            // item={(item) => this.addItem(item)}
            />
            {showUpdateAddressModal ?
                <UpdateAddress
                    editItem={currentAddress}
                    show={showUpdateAddressModal}
                    onHide={() => setShowUpdateAddressModal(false)}
                    done={(items) => doneUpdateAddress(items)}
                // item={(item) => this.addItem(item)}
                />
                : ''}
        </div>
    );
}

export default Address;
