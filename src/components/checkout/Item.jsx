import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FiMinus, FiPlus } from 'react-icons/fi';

const Item = ({
    data,
    bag,
    index,
    changeQuantity,
    removeCart
}) => {
    // const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        if (data.quantity < data.stock) {
            changeQuantity(index, data.quantity + 1)
        } else {
            alert("Only " + data.stock + " quantity is available!")
        }
    }
    const decreaseQuantity = () => {
        if (data.quantity > 1) {
            changeQuantity(index, data.quantity - 1)
        }
    }
    return (
        <div className="d-flex mb-3">
            <div className="img-box img-parent mr-3">
                <img
                    src={data.image}
                    className="img-ch"
                    alt="" />
            </div>
            <div className="mr-auto">
                <p className="f-md-bold-sm">{data.name}</p>
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
            </div>
            <div className="align-self-center mr-2">
                <p className="f-md-bold mb-0">{bag.currency} {data.sub_total}</p>
            </div>
            <div className="">
                <AiFillDelete
                    onClick={() => removeCart(index)}
                    className="float-right f-lg clr-tdk cp" />
            </div>
        </div>
    );
}

export default Item;
