import React from 'react';
import styles from './alarmon.module.css';
const AlarmOn = ({setOpen,AlarmHandler}) => {
    return(
        <div className={styles.content}>
            <div className={styles.title}>사용자님,</div>
            <div className={styles.title}>새 구인글 알림을 받아보세요.</div>
            <div className={styles.subTitle}>우리동네 좋은 알바를 놓치지 않도록 도와드릴게요!</div>
            <div className={styles.bts}>
                <button className={styles.btnLeft} onClick={() => setOpen(false)}>
                    나중에
                </button>
                <button className={styles.btnRight} onClick={()=> {AlarmHandler();setOpen(false);}}>
                    구인글 알림 받기
                </button>
            </div>
        </div>
    );
}

export default AlarmOn;