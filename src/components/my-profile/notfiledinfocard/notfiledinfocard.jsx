import React from 'react';
import styles from './notfiledinfocard.module.css'
const NotFiledInfoCard = ({info,editInfoPage}) => {
    const {shortTitle,id} = info;
    return (
        <li className={styles.card}>
            <div className={styles.title}>{shortTitle}</div>
            <div className={styles.subTitle}>작성된 {shortTitle}가 없습니다.</div>
            <button className={styles.btn} onClick={()=>editInfoPage(id)}>{shortTitle} 등록</button>
        </li>
    );
}

export default NotFiledInfoCard;