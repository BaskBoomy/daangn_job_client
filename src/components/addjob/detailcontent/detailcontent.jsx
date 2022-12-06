import React from 'react';
import { memo } from 'react';
import styles from './detailcontent.module.css';

const DetailContent = memo(({value,onChange,error}) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>상세 내용</div>
            <div className={styles.box}>
                <textarea
                    className={styles.textArea}
                    name='detailcontent'
                    value={value}
                    onChange={onChange}
                    placeholder='예) 업무 예시, 근무 여건, 지원자가 갖추어야 할 능력, 우대 사항 등'
                    />
                <div className={styles.textCount}>
                    {value.length}/2000</div> 
            </div>
            <div className='errorMessage'>{error}</div>
        </div>
    );
});

export default DetailContent;