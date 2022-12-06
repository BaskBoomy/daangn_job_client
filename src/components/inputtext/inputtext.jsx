import React from 'react';
import styles from './inputtext.module.css';

const InputText = ({title,placeholder,onChange,name,value,isChoosable=false,error}) => {
    return (
        <div className={styles.inputBox}>
            <div className={styles.title}>
                {title}
                {isChoosable && <span>(선택)</span>}
            </div>
            <input 
                className='inputBox'
                type='text'
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}/>
            <div className='errorMessage'>{error}</div>
        </div>
    );
}

export default InputText;