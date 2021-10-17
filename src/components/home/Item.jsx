// import React, { useRef, useEffect, useState } from 'react';
// import { Col, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Item = (props) => {
//     console.log(props.data)
//     const ref = useRef(null);
//     const [width, setWidth] = useState();
//     useEffect(() => {
//         setWidth(ref.current.offsetWidth)
//     }, [ref.current]);

//     return (
//         <Col className="p-0">
//             <div className="pl-3">
//                 <Link to="/" className="item-box img-parent" ref={ref} style={{ 'height': width }}>
//                     <img src={`/images/products/${props.image}`} alt="" className="img-ch" />
//                     <div className="t-sn">Shop Now</div>
//                 </Link>
//                 {/* <p className="f-md-bold mt-3 text-left">{props.data.name}</p> */}
//             </div>
//         </Col>

//     );
// }

// export default Item;

import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        }
    }
    componentDidMount() {
        const width = this.divElement.clientWidth;
        this.setState({ width });
    }
    
    render() {
        return (
            <Col className="p-0">
                <div className="pl-3">
                    <Link to={`/product/${this.props.data.id}`} className="item-box img-parent"
                        // ref={ref} 
                        style={{ 'height': this.state.width }}
                        ref={(divElement) => { this.divElement = divElement }}
                    >
                        <img src={this.props.data ? this.props.data.image : ''} alt={this.props.data ? this.props.data.name : 'House of kanakambaram'} className="img-ch" />
                        <div className="t-sn">Shop Now</div>
                    </Link>
                    <p className="f-md-bold mt-3 text-left">{this.props.data ? this.props.data.name : ''}</p>
                </div>
            </Col>
        );
    }
}

export default Item;
