import React from 'react';
import styles from './profilefix.module.css';

const ProfileFix = (props) => {
    return (
        <div className={styles.contaier}>
            <button className={styles.blackBtn}>프로필 사진 수정</button>
            <div className={styles.stroke}></div>
            <button className={styles.orangeBtn}>프로필 사진 삭제</button>
        </div>
    );
}

export default ProfileFix;