import React from 'react';
import styles from './editbtns.module.css';
const EditBtns = ({editBtnHandler,setOpen,careerId,deleteCareer}) => {
    const onEdit = (e) => {
        editBtnHandler();
        setOpen(false);
    }
    const onDelete = () => {
        console.log(careerId);
        deleteCareer(careerId);
        
        setOpen(false);
    }
    return (
        <div className={styles.contaner}>
            <button className={styles.btn} onClick={onEdit}>수정</button>
            <button className={`${styles.btn} ${styles.red}`} onClick={onDelete}>삭제</button>
        </div>
    );
}

export default EditBtns;