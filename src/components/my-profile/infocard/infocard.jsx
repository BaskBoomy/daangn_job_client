import React from 'react';
import styles from './infocard.module.css';
const InfoCard = ({info, editInfoPage}) => {
    const {id,title,Icon,subTitle,btnTitle,btnTitleWritten,isWritten} = info;
    const btnHandler = () => {
        editInfoPage(id);
    }
    return (
        <div className={styles.container}>
            <Icon/>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>{subTitle}</div>
            {!isWritten === true 
            ? <button className={styles.btnOrange} onClick={btnHandler}>{btnTitle}</button>
            : <button className={styles.btnGray} onClick={btnHandler}>{btnTitleWritten}</button>}
            
        </div>
    );
}

export default InfoCard;