import React from 'react';
import styles from './careercard.module.css';
import {ReactComponent as More} from '../../../../../assets/more.svg';
const CareerCard = ({ id, career,openEditBtsBottomSheet}) => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.title}>{career.place}</div>
                <div className={styles.subTitle}>{career.startedDate} ~ {career.isWorking ? '(현재 일하는 중)' : career.endedDate}</div>
                <div className={styles.content}>{career.detail}</div>
            </div>
            <div className={styles.right}>
                <More fill='gray' className={styles.btn} onClick={()=>{openEditBtsBottomSheet(id)}}/>
            </div>
        </div>
    );
}

export default CareerCard;