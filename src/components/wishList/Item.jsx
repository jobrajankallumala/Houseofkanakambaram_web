import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Item = ({ data, remove, cartItems, addToCart }) => {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setWidth(ref.current.offsetWidth)
    }, [ref.current]);

    const findIsCart = () => {
        if (cartItems.products) {
            let exItem = cartItems.products.find(e => e.product_id === data.product_id);
            if (exItem == undefined) {
                return false
            } else {
                return true;
            }

        }
        return false

    }

    return (
        <div
            className="mb-4 col-lg-3 col-sm-4 col-6 cp">
            <Link to={`/product/${data.product_id}`}>
                <div className="item-box img-parent mb-3"
                    ref={ref}
                    style={{ 'height': width + 5 }}
                >
                    <img src={data.image} alt="" className="img-ch" />


                </div>

                <p className="f-md-bold text-left">{data.name}</p>
            </Link>
            <div className="d-flex">
                {data.discount_price ?
                    <>
                        <span className="f-md-bold-sm mr-2">{data.currency} {data.discount_price}</span>
                        <span className="f-md-bold-sm clr-tk"><s>{data.currency} {data.price}</s></span>
                    </>
                    : <span className="f-md-bold-sm clr-tk">{data.currency} {data.price}</span>}


            </div>
            <div className=" mt-3 buttons">

                <Button className="bg-tlt clr-tdk mr-1" onClick={() => remove(data.id)}>Remove</Button>
                {(data.stock > 0 && !findIsCart()) ?
                    <Button className="bg-tdk clr-tlt" onClick={(e) => addToCart(data)}>Add to Cart</Button>
                    : ''}
            </div>


        </div>
    );
}

export default Item;
