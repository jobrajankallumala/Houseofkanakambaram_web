import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

const Gallery = (props) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        // console.log('kkkkkkkkkkkk', props)
        // if (props.data != undefined && props.data.images.length) {
        //     console.log('helloooo')
        //     let images = props.data.images.map((item, index) => {
        //         return {
        //             original: item,
        //             thumbnail: item,
        //         }
        //     });
        //     console.log(images)
        //     // setImages(images);
        // }
    });

    // const images = [
    //     {
    //         original: '/images/products/product-09.jpg',
    //         thumbnail: '/images/products/product-09.jpg',
    //     },
    //     {
    //         original: '/images/products/product-09.jpg',
    //         thumbnail: '/images/products/product-09.jpg',
    //     },
    //     {
    //         original: '/images/products/product-09.jpg',
    //         thumbnail: '/images/products/product-09.jpg',
    //     },
    // ];
    return (
        <div>
                <ImageGallery
                    items={props.data}
                    thumbnailPosition="left"
                    showPlayButton={false}
                    showNav={false}
                />
          
        </div>
    )
}
export default Gallery;
