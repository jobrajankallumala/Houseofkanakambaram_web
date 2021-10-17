import React, { useRef, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { BiHeart, BiShoppingBag } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from '../../js/actions';
import History from '../../general/lib/history';

const Item = (props) => {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        setWidth(ref.current.offsetWidth)
    }, [ref.current]);
    const addToCart = (event, item) => {
        let cartItems = cart;
        cartItems.push({
            product_id: item.id,
            quantity: 1,
            image: item.image
        });

        dispatch(addToCart(cartItems))
        console.log('cart', cart);
    }
    const clickItem = (event, item) => {
        var noRedirect = '.t-cart *';
        if (!event.target.matches(noRedirect)) {
            History.push(`/product/${item.id}`);
        } 
    }
    return (
        <div
            onClick={(event) => clickItem(event, props.data)}
            // to={`/product/${props.data.id}`}
            className="mb-4 col-md-4 col-6">
            <div className="item-box img-parent mb-3" ref={ref} style={{ 'height': width + 5 }}>
                <img src={props.data.image} alt="" className="img-ch" />
                {(props.data.discount != undefined && Object.keys(props.data.discount).length) ?
                    <div className="t-offer clr-tlt">{parseFloat(props.data.discount.percentage)} %<br />off</div>
                    : ''}
                <div className="t-cart d-flex">
                    <div className="mr-sm-3 mr-1 wish">
                        <BiHeart
                        // onClick={(e) => addToCart(e, props.data)} 
                        />
                    </div>
                    <div className="bag" onClick={(e) => addToCart(e, props.data)} >
                        <BiShoppingBag

                        />
                    </div>
                </div>
            </div>

            <p className="f-md-bold text-left">{props.data.name}</p>
            <div className="d-flex">

                {props.data.discount_price ?
                    <>
                        <span className="f-md-bold-sm mr-2">RS {props.data.discount_price}</span>
                        <span className="f-md-bold-sm clr-tk"><s>RS {props.data.price}</s></span>
                    </>
                    : <span className="f-md-bold-sm clr-tk">RS {props.data.price}</span>}
            </div>


        </div>
    );
}

export default Item;
