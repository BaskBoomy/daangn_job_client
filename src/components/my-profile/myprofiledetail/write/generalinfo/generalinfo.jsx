import React,{useRef, useEffect, useState} from 'react';
import styles from './generalinfo.module.css';
import { ReactComponent as ArrowDown } from '../../../../../assets/arrow-down.svg';
const GeneralInfo = ({handleInputChange,formInputData,errorMessage,onSubmitHandler}) => {
    const {name, phoneNumber, gender, borndate} = formInputData;
    const [open, setOpen] = useState(false);
    const popupRef = useRef();
    const popupBodyRef = useRef();
    const popupHandler = () => {
        if (open) {
            popupRef.current.style.display = 'none';
            setOpen(false);
        } else {
            popupRef.current.style.display = 'flex';
            setOpen(true);
        }
    }
    //T0-DO(Jack) : raect-modal로 수정
    //popup이외영역 클릭시 hide
    useEffect(() => {
        document.addEventListener('mousedown', popupClickEvent);
        return () => {
            document.removeEventListener('mousedown', popupClickEvent);
        }
    })
    const popupClickEvent = (e) => {
        if (open && !popupBodyRef.current.contains(e.target)) {
            popupHandler();
        }
    }

    return (
        <>
            <div className={styles.inputBox}>
                <div className={styles.title}>
                    이름 <span>(선택)</span>
                </div>
                <input
                    className='inputBox'
                    type='text'
                    placeholder='실명을 입력해주세요.'
                    name='name'
                    onChange={handleInputChange}
                    value={name}
                />
            </div>
            <div className={styles.inputBox}>
                <div className={styles.title}>연락처</div>
                <div className={styles.subTitle}>전화번호는 안심번호로 표시돼요.</div>
                <input
                    className='inputBox'
                    type='tel'
                    placeholder='010 0000 0000'
                    name='phoneNumber'
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={handleInputChange}
                    value={phoneNumber}
                />
                <span className={styles.errormsg}>{errorMessage.phoneNumber}</span>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.title}>성별</div>
                <div className={styles.popupBtn} onClick={popupHandler}>
                    {!gender ? '선택해주세요' : gender}
                    <ArrowDown />
                </div>
                <span className={styles.errormsg}>{errorMessage.gender}</span>
            </div>
            <div ref={popupRef} className={styles.popupContaier}>
                <div ref={popupBodyRef} className={styles.popupBody}>
                    <label htmlFor='radio1'><div>선택해주세요<input type='radio' id='radio1' name='gender' value={''} onChange={handleInputChange} /></div></label>
                    <label htmlFor='radio2'><div>여성<input type='radio' id='radio2' name='gender' value={'여성'} onChange={handleInputChange} /></div></label>
                    <label htmlFor='radio3'><div>남성<input type='radio' id='radio3' name='gender' value={'남성'} onChange={handleInputChange} /></div></label>
                </div>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.title}>태어난 연도</div>
                <div className={styles.subTitle}>태어난 연도를 숫자 4자리로 입력해주세요. 알바 프로필에는 나이대로 표시돼요. 예) 30대, 40대 등</div>
                <input
                    className='inputBox'
                    type='number'
                    placeholder='태어난 연도를 입력해주세요.'
                    name='borndate'
                    min='0'
                    max='9999'
                    onChange={handleInputChange}
                    value={borndate}
                />
                <span className={styles.errormsg}>{errorMessage.borndate}</span>
            </div>
            {onSubmitHandler &&<button className={styles.submitBtn} onClick={onSubmitHandler}>완료</button>}
        </>
    );
}

export default GeneralInfo;