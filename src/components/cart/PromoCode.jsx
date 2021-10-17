import React from 'react';
import { Button, Form } from 'react-bootstrap';

const PromoCode = () => {
    return (
        <div className="d-sm-flex  promo">
            <p className="f-md mr-2 align-self-center mb-3 mb-sm-0 text-sm-center text-left">Have a gift card ?</p>
            <Form className="d-flex">
                <Form.Group controlId="formBasicEmail" className="mr-3 mb-0">

                    <Form.Control type="text" placeholder="Gift card code" />

                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-0">

                    <Button variant="primary" type="submit">
                        Apply
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default PromoCode;
