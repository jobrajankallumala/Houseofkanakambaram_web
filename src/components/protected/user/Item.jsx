import React from 'react';
import { Link } from 'react-router-dom';

export default function Item({ data }) {
    return (
        <tr>
            <td className="d-flex pl-0">
                <Link to={`orderdetails/${data.order_item_id}`} className="d-flex">
                    <div className="img-box img-parent mr-3">
                        <img
                            src={data.product.image}
                            className="img-ch"
                            alt="" />
                    </div>
                    <p className="align-self-center mb-0">{data.product.name}</p>
                </Link>
            </td>
            <td>Quantity : {data.quantity}</td>
            <td>Status : {data.order_status}</td>

            <td className="f-md-bold pl-0">{data.currency} {data.total_price}</td>


        </tr>
    )
}
