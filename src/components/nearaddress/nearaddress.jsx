import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../headerwithbackicon/header';
import styles from './nearaddress.module.css';

const NearAddress = (props) => {
    const location = useLocation();
    const address = location.state.address;
    //length, address 1~4
    const {user} = useAuth();
    
    
    const addressList = (array) => {
        return Object.keys(array).map(key=>{
            if(array[key].address.split(' ')[2]){
                const dong = array[key].address.split(' ')[2];
                return parseInt(key) === parseInt(array.length-1) ? `${dong}` : `${dong}, `;
            }
        })
    }
    return (
        <>
            <Header title={`${user.myplace.address.split(' ')[2]} 외 근처 동네 ${address.size}개`}/>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.title}>내 동네</div>
                    <p>{addressList(address.part[0])}</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.title}>가까운 동네</div>
                    <p>{addressList(address.part[1])}</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.title}>조금 먼 동네</div>
                    <p>{addressList(address.part[2])}</p>
                </div>
                <div className={styles.box}>
                    <div className={styles.title}>먼 동네</div>
                    <p>{addressList(address.part[3])}</p>
                </div>
            </div>
        </>
    );
}

export default NearAddress;