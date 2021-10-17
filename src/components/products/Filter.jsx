import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { useSelector } from "react-redux";

const Filter = ({
    category_id,
    tag_id,
    tag_string,
    price_max,
    changeCategoryId,
    changeMaxPrice
}) => {
    // const [price, setPrice] = useState(0);
    const categories = useSelector(state => state.categories);
    const cart = useSelector(state => state.cart);

    function handleChangeMaxPrice(event) {
        event.preventDefault();
        const { name, value } = event.target;
        changeMaxPrice(value)
    }
    // const handleChangeMaxPrice =(event) => {

    // }
    function handleChangeCategory(evt, item = null) {
        if (item) {
            changeCategoryId(item.id);
        } else {
            changeCategoryId(null);
        }
    }
    return (
        <div className="p-3 border shadow-sm">
            <h6 className="f-lg-bold-sm mb-3">Category </h6>
            <Form className="f-md">
                <Form.Group controlId="formBasicPassword">
                    <Form.Check
                        checked={(category_id || tag_string || tag_id) ? false : true}
                        type="radio"
                        className="my-1 mr-sm-2"
                        id="get-all"
                        label="All products"
                        name="category-select"
                        custom
                        onChange={(e) => handleChangeCategory(e)}
                    />
                    {categories.map((item, index) => {
                        return <Form.Check
                            key={index}
                            checked={item.id == category_id ? true : false}
                            type="radio"
                            className="my-1 mr-sm-2"
                            id={`cat-${index}`}
                            label={item.name}
                            name="category-select"
                            custom
                            onChange={(e) => handleChangeCategory(e, item)}
                        />
                    })}

                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    
                    <RangeSlider
                        // className="form-control"
                        min={500}
                        max={10000}
                        value={price_max}
                        onChange={e => handleChangeMaxPrice(e)}
                        variant="success"
                        step={500}
                    />
                    <div className="d-flex">
                        <span>500</span>
                        {price_max > 0 ?
                            <span className="ml-auto">{price_max}</span>
                            : ''}
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Filter;
