import React from 'react';
import styles from './phonenumber.module.css';

const PhoneNumber = ({value,onChange,error}) => {
    const {number,uncallable} = value;
    return (
        <div className={styles.container}>
            <div className={styles.title}>연락처</div>
            <div className={styles.subTitle}>전화번호는 안심번호로 표시돼요.</div>
            <input
                className={styles.inputBox}
                type='number'
                name='number'
                value={number}
                onChange={onChange}/>
            <div className={styles.box}>
                <label htmlFor='uncallable'>
                    <input
                        id='uncallable'
                        type='checkbox'
                        name='uncallable'
                        value={uncallable}
                        checked={uncallable}
                        onChange={onChange}/> 전화 안 받기
                </label>
            </div>
            <div className='errorMessage'>{error}</div>
        </div>
    );
}

export default PhoneNumber;