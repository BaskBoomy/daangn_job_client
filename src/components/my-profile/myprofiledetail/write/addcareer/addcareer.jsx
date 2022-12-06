import React, { useEffect,useRef, useState } from 'react';
import styles from './addcareer.module.css';
import Header from '../../../../headerwithbackicon/header';
import ToggleSwitch from '../../../../toggleswitch/toggleswitch';
import DatePicker from '../../../../datepicker/datepicker';
import { ReactComponent as ArrowDown } from '../../../../../assets/arrow-down.svg';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)',
        width: '80%'
    },
};
const AddCareer = ({ InputValidation,update}) => {
    const [textCount, setTextCount] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [datePickerRef, setDatePickerRef] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [newCareer, setNewCareer] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isWokring, setIsWokring] = useState(false);
    const navigate = useNavigate();

    const formRef = useRef();
    const placeRef = useRef();
    const isWorkingRef = useRef();
    const startedDateRef = useRef();
    const endedDateRef = useRef();
    const detailRef = useRef();

    const openTimeModal = (name) => {
        setIsOpen(true);
        name === 'startedDate' ? setDatePickerRef(startedDateRef) : setDatePickerRef(endedDateRef);
    }
    const closeTimeModal = () => {
        setIsOpen(false);
    }
    const textAreaHandler = (e) => {
        const value = e.target.value;
        value.length > 1000 && setFormErrors((errors)=>({...errors,detail:'최대 1000자까지 입력할 수 있어요.'}));
        value.length <= 1000 && setFormErrors((errors)=>({...errors,detail:''}));
        setTextCount(value.length);
    }
    const onSubmit= () => {
        formRef.current.reset();
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData.careers){
            userData.careers = {};
        }
        userData.careers[newCareer.id] = newCareer;
        if(update){
            //변경된 career값을 DB에서 UPDATE해준다.
            console.log(userData.careers);
            update({
                careers : userData.careers
            });
        }else{
            //career값을 localStorage에 저장한다.
            localStorage.setItem('userData',JSON.stringify(userData));
        }
        navigate(-1);
    }
    const careerHandler = (e) => {
        e.preventDefault();
        const career = {
            id: new Date().getTime(),
            place: placeRef.current.value || '',
            isWorking: isWorkingRef.current.checked || false,
            startedDate: startedDateRef.current.value || '',
            endedDate: endedDateRef.current.value || '',
            detail: detailRef.current.value || '',
            textCount: textCount
        }
        setNewCareer({...career});
        setFormErrors(InputValidation.career(career));
        setIsSubmitting(true);
    }
    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            onSubmit();
        }
    },[formErrors,isSubmitting]);

    const toggleHandler = (e) => {
        setIsWokring(isWorkingRef.current.checked);
    }
    return (
        <>
            <Header title={'경력 추가'} />
            <form ref={formRef} onSubmit={careerHandler}>
                <div className={styles.container}>
                    <div className={styles.inputBox}>
                        <div className={styles.title}>
                            일한 곳
                        </div>
                        <input
                            ref={placeRef}
                            className='inputBox'
                            type='text'
                            placeholder='일한 곳 이름을 알려주세요.'
                            name='place'
                        />
                        <span className={styles.errormsg}>{formErrors.place}</span>
                    </div>
                    <div className={styles.inputBox}>
                        <div className={styles.title}>
                            일한 기간
                        </div>
                        <div className={styles.subTitle}>
                            <div className={styles.text}>현재 일하는 중</div>
                            <ToggleSwitch innerRef={isWorkingRef} name={'isWorking'} onChange={toggleHandler} />
                        </div>
                        <div className={styles.dateContainer}>
                            <div className={styles.dateBox}>
                                <div className={styles.dateBoxTitle}>시작</div>
                                <div className={styles.popupBtn} onClick={() => { openTimeModal('startedDate') }}>
                                    <input 
                                        ref={startedDateRef}
                                        type='text'
                                        className={styles.timeBox}
                                        placeholder='날짜 선택'/>
                                    <ArrowDown />
                                </div>
                            </div>
                            <span>~</span>
                            <div className={styles.dateBox}>
                                <div className={`${styles.dateBoxTitle} ${isWokring && styles.blockTitle}`}>종료</div>
                                <div className={`${styles.popupBtn} ${isWokring && styles.blockPopupBtn}`} onClick={() => { openTimeModal('endedDate') }}>
                                    <input 
                                        ref={endedDateRef}
                                        type='text'
                                        className={styles.timeBox}
                                        placeholder='날짜 선택'/>
                                    <ArrowDown />
                                </div>
                            </div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeTimeModal}
                                style={customStyles}
                            >
                                <DatePicker
                                    closeModal={closeTimeModal}
                                    innerRef={datePickerRef} />
                            </Modal>
                        </div>
                        <span className={styles.errormsg}>{formErrors.date}</span>
                    </div>
                    <div className={styles.inputBox}>
                        <div className={styles.title}>
                            상세 내용 <span>(선택)</span>
                        </div>
                        <div className={styles.textAreaBox}>
                            <textarea
                                ref={detailRef}
                                className={`inputBox ${styles.textBox}`}
                                placeholder='어떤 일을 하셨는지 설명해주세요.'
                                name='detail'
                                onChange={textAreaHandler}
                            />
                            <span>{textCount}/1000</span>
                        </div>
                    </div>
                    <span className={styles.errormsg}>{formErrors.detail}</span>
                    <button type='submit' className={styles.orangeBtn} >완료</button>
                </div>
            </form>
        </>
    );
};

export default AddCareer;