import React from "react";
import { BiEditAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom'

interface Props {
    size: string;
    iSicon: Boolean;
    shape: string;
    children?: React.ReactNode;
    onClick: () => void;
    isLoading: Boolean,
    position: string,
    Url: string
}

const Button: React.FC<Props> = ({
    size,
    iSicon,
    children,
    shape,
    onClick,
    isLoading,
    position,
    Url
}) => {
    return (
        Url ?
            <Link
                to={Url}
            >
                <button
                    onClick={onClick}
                    className={`table-tm-btn edit shadow-sm table-tm-btn-${shape ? shape : 'default'} tm-btn-${size ? size : 'sm'} float-${position}`}
                    style={{
                        // backgroundColor: color,
                        // border,
                        // borderRadius: radius,
                        // height,
                        // width
                    }}
                >
                    {isLoading ? 'submiting...' : children}
                    {iSicon ? <BiEditAlt /> : ''}
                </button>
            </Link>
            :
            <button
                onClick={onClick}
                className={`table-tm-btn edit shadow-sm table-tm-btn-${shape ? shape : 'default'} tm-btn-${size ? size : 'sm'} float-${position}`}
                style={{}}
            >
                {isLoading ? 'submiting...' : children}
                {iSicon ? <BiEditAlt /> : ''}
            </button>
    );
}

export default Button;