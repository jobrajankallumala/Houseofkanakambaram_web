import React from 'react';
// import {FaSpinner} from 'react-icons/fa';

export default function BtnLoading(props) {
    return (
        <div style={{ 'display': 'inline' }}>
            {/* <FaSpinner className="mr-2"/>{props.title} */}
            <img src="/loading-gif.gif" className="h-100" alt="loading"  />
        </div>
    )
}
