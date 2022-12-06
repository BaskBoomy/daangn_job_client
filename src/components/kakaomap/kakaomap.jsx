import React, { useEffect } from 'react';
import styles from './kakaomap.module.css';

const { kakao } = window;

const KakaoMap = ({ x, y }) => {
    useEffect(() => {
        const container = document.getElementById('map');
        const markerPosition = new kakao.maps.LatLng(y, x);
        const options = {
            center: markerPosition,
            level: 3
        };
        var map = new kakao.maps.Map(container, options);

        var imageSrc = './images/carrot.png'; 
        var imageSize = new kakao.maps.Size(35, 45); 
        var imageOption = { offset: new kakao.maps.Point(15, 45) }; 
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage 
        });
        marker.setMap(map);
    }, [])
    return (
        <div id='map' className={styles.kakaoMap}></div>
    );
}

export default KakaoMap;