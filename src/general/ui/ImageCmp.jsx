import React from "react";
import { BsPlus } from 'react-icons/bs';


interface Props {
    size: string;
    url: string;
}

function getImage(params) {
    console.log(this.url)
}

const Img: React.FC<Props> = ({
    size,
    url,

}) => {
    return (


        <img
            src={getImage()}

        />


    );
}

export default Img;