import React,{memo,useState} from 'react';
import styles from './selfintroduction.module.css';
const SelfIntroduction = memo(({handleInputChange,value,errorMessage,onSubmitHandler}) => {
    const [textCount, setTextCount] = useState(value ? value.length : 0);
    const textAreaHandler = (e) => {
        handleInputChange(e);
        setTextCount(value.length);
    }
    return (
        <div className={styles.inputBox}>
                <div className={styles.title}>
                    자기소개 <span>(선택)</span>
                </div>
                <div className={styles.textAreaBox}>
                    <textarea
                        className={`inputBox ${styles.textBox}`}
                        placeholder='본인이 일했던 경험과 할 수 있는 업무에 대해 소개해주세요.'
                        name='selfIntroduction'
                        onChange={textAreaHandler}
                        value={value}
                    />
                    <span>{textCount}/2000</span>
                </div>
                <span className={styles.errormsg}>{errorMessage.selfIntroduction}</span>
                {onSubmitHandler &&<button className={styles.submitBtn} onClick={onSubmitHandler}>완료</button>}
            </div>
    );
})

export default SelfIntroduction;