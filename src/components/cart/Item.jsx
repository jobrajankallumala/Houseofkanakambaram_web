import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function Item(
    {
        data,
        bag,
        index,
        changeQuantity,
        removeCart
    }
) {
    // const [quantity, setQuantity] = useState(1)
    const increaseQuantity = () => {
        if (data.quantity < data.stock) {
            changeQuantity(index, data.quantity + 1)
        }
        else {
            alert("Only " + data.stock + " quantity is available!")
        }
    }
    const decreaseQuantity = () => {
        if (data.quantity > 1) {
            changeQuantity(index, data.quantity - 1)
        }
    }
    return (
        <tr>
            <td className="d-flex pl-0">
                <div className="img-box img-parent mr-3">
                    <img
                        src={data.image}
                        className="img-ch"
                        alt="" />
                </div>
                <p className="align-self-center mb-0">{data.name}</p>
            </td>


            <td className="f-md-bold">{bag.currency} {data.price}</td>
            <td>
                <div className="quantity">
                    <div className=" box-c">
                        <div className="box" onClick={decreaseQuantity}>
                            <FiMinus />
                        </div>
                        <div className="box"><span className="f-md-bold">{data.quantity}</span></div>
                        <div className="box" onClick={increaseQuantity}>
                            <FiPlus />
                        </div>
                    </div>
                </div>
            </td>
            <td className="f-md-bold">{bag.currency} {data.sub_total}</td>
            <td><AiFillDelete
                onClick={() => removeCart(index)}
                className="float-right f-lg clr-tdk cp" /></td>

        </tr>
    )
}
