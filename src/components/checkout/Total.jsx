import React from 'react';
import { Col } from 'react-bootstrap';

const Total = ({ data, bag }) => {
    return (
        <div className="total ">
            <div className="bg-ti">
                <Col className="d-flex border-bottom py-3">
                    <p className="f-md mb-0">Subtotal</p>
                    <p className="f-md-bold ml-auto mb-0">{bag.currency} {data.sub_total}</p>
                </Col>
                <Col className=" py-3">
                    <div className="d-flex">
                        <p className="f-md mb-0">Total</p>
                        <p className="f-md-bold ml-auto mb-0">{bag.currency} {data.total}</p>
                    </div>
                    {data.tax_amount > 0 ?
                        <p className="f-sm text-left mt-3">
                            (includes < span className="f-sm-bold">{bag.currency} {data.tax_amount}</span> Tax estimated for India)
                        </p>
                        : <p className="f-sm text-left mt-3">
                            Tax will be added according to the country.
                        </p>
                    }
                </Col>
            </div>

        </div >
    );
}

export default Total;
