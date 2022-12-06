import React,{useRef} from 'react';
import styles from './datepicker.module.css';
const data = [];
for (let i = 1900; i < 2100; i++) {
    data.push({ id: i, value: i });
}
const DatePicker = ({closeModal,innerRef,onChange}) => {
    const yearRef = useRef();
    const montyRef = useRef();
    const cancelHandler = () => {
        closeModal();
    };
    const removeTimeHandler = () => {
        yearRef.current.value = '';
        montyRef.current.value = '';
        innerRef.current.value = '';
        closeModal();
    }
    const setTimeHandler = () => {
        const inputFieldValue = `${yearRef.current.value}-${montyRef.current.value}`;
        innerRef.current.value = inputFieldValue;
        closeModal();
    }
    return (
        <>
            <div className={styles.title}>월 설정</div>
            <div className={styles.inputBox}>
                <input 
                    type='number' 
                    ref={yearRef} 
                    className={styles.inputNumber} 
                    max={2100} 
                    min={1900} 
                    name='year'
                    defaultValue={innerRef.current.value ? innerRef.current.value.split('-')[0] : new Date().getFullYear()} 
                    onChange={onChange}/>
                <input 
                    type='number' 
                    ref={montyRef} 
                    className={styles.inputNumber} 
                    max={12} 
                    min={1} 
                    name='month'
                    defaultValue={innerRef.current.value ? innerRef.current.value.split('-')[1] : new Date().getMonth()}
                    onChange={onChange}  />
            </div>
            <div className={styles.footer}>
                <div>
                    <button className={styles.btn} onClick={removeTimeHandler}>삭제</button>
                </div>
                <div>
                    <button className={styles.btn} onClick={cancelHandler}>취소</button>
                    <button className={styles.btn} onClick={setTimeHandler}>설정</button>
                </div>
            </div>
        </>
    );
}

export default DatePicker;