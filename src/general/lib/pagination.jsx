import React from 'react';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { Col } from 'react-bootstrap';

function pagesNumber(props) {
    if (!props.pagination.to) {
        return [];
    }
    let from = props.pagination.currentPage - props.offset;
    if (from < 1) {
        from = 1;
    }

    let to = from + props.offset * 2;
    if (to >= props.pagination.lastPage) {
        to = props.pagination.lastPage;
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
        pagesArray.push(page);
    }

    return pagesArray;
}

export const pagination = props => {

    const pages = pagesNumber(props);

    return (
        <div>
            <Col className="pagination mt-3 justify-content-center justify-content-sm-end px-0">
                
                <Col className="d-flex col-auto px-0">
                    {props.pagination.currentPage > 1 ?
                        <div onClick={() => props.paginate(props.pagination.currentPage - 1)} className="box mr-3"><HiArrowNarrowLeft /></div>
                        : ''}
                    {pages.map((page, index) => {
                        return <div key={index} onClick={() => props.paginate(page)} className={`box mx-1 ${page == props.pagination.currentPage ? 'active' : ''}`}><span>{page}</span></div>

                    })}
                    {props.pagination.currentPage < props.pagination.lastPage ?
                        <div onClick={() => props.paginate(props.pagination.currentPage + 1)} className="box ml-3"><HiArrowNarrowRight /></div>
                        : ''}
                </Col>
            </Col>
        </div>
    )
}
export default pagination
