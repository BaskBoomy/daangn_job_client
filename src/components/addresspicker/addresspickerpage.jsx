import React from 'react';
import Header from '../headerwithbackicon/header';
import styles from './addresspickerpage.module.css';
import Postcode from 'react-daum-postcode';
import { useLocation, useNavigate } from 'react-router-dom';
const { kakao } = window;
const AddressPickerPage = ({ JobRepository }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const getAddressData = data => {

        //입력받은 주소지로 좌표 반환
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(data.address, async function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(data);
                const myAddress = {
                    zonecode: data.zonecode,
                    address: data.address,
                    jibunAddress: data.jibunAddress,
                    dong: data.bname,
                    x: result[0].x,
                    y: result[0].y,
                    hname: data.hname,
                }
                // 주소 데이터 저장
                JobRepository
                    .setAddress(myAddress)
                    .then(() => navigate('/add-job', { state: { 'isSaved': true } }));
            }
        })
    };
    return (
        <>
            <Header title='주소 검색' />
            <div className={styles.container}>
                <Postcode
                    style={{ flex: 1, width: '100%', minHeight: '800px' }}
                    onComplete={data => getAddressData(data)}
                />
            </div>
        </>
    );
};

export default AddressPickerPage;