import React from "react";
import { BsPlus } from 'react-icons/bs';


interface Props {
    size: string;
    iSicon: Boolean;
    shape: string;
    children?: React.ReactNode;
    onClick: () => void;
    isLoading: Boolean,
    position: string,
    type: string,
}

const Button: React.FC<Props> = ({
    size,
    iSicon,
    children,
    shape,
    onClick,
    isLoading,
    position,
    type,
}) => {
    return (


        <button
            type={type ? type : 'button'}
            onClick={onClick}
            className={`tm-btn shadow-sm tm-btn-${shape ? shape : 'default'} tm-btn-${size ? size : 'sm'} float-${position}`}
            style={{

            }}
        >
            {isLoading ? 'submiting...' : children}
            {iSicon ? <BsPlus /> : ''}
        </button>


    );
}

export default Button;