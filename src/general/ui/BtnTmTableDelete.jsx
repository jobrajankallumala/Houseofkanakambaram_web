import React from "react";
import { BiTrash } from 'react-icons/bi'

interface Props {
    size: string;
    iSicon: Boolean;
    shape: string;
    children?: React.ReactNode;
    onClick: () => void;
    isLoading: Boolean,
    position: string
}

const Button: React.FC<Props> = ({
    size,
    iSicon,
    children,
    shape,
    onClick,
    isLoading,
    position
}) => {
    return (
        <button
            onClick={onClick}
            className={`table-tm-btn delete shadow-sm table-tm-btn-${shape ? shape : 'default'} tm-btn-${size ? size : 'sm'} float-${position}`}
            style={{
                // backgroundColor: color,
                // border,
                // borderRadius: radius,
                // height,
                // width
            }}
        >
            {isLoading ? 'submiting...' : children}
            {iSicon ? <BiTrash /> : ''}
        </button>
    );
}

export default Button;