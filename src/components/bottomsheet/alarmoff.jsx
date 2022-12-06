import React from 'react';
import styles from './alarmoff.module.css';

const AlarmOff = ({setOpen,AlarmHandler}) => {
    return(
        <div className={styles.content}>
            <div className={styles.titleWrap}>
                <div className={styles.title}>새 구인글 알림을</div>
                <div className={styles.title}>더이상 받고 싶지 않나요?</div>
            </div>
            <div className={styles.bts}>
                <button className={styles.btnLeft} onClick={() => setOpen(false)}>
                    계속 받기
                </button>
                <button className={styles.btnRight} onClick={()=> {AlarmHandler();setOpen(false);}}>
                    알림 안 받기
                </button>
            </div>
        </div>
    );
}

export default AlarmOff;