import React from 'react';
import styles from './imageslider.module.css';
import SimpleImageSlider from "react-simple-image-slider";
const ImageSlider = ({images}) => {
    return (
        <SimpleImageSlider
                    width={'100%'}
                    height={300}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    navMargin={10}
                    navSize={35}
                />
    );
}

export default ImageSlider;