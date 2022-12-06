import React, { useEffect, useState,useRef} from 'react';
import styles from './editcareer.module.css';
import Header from '../../../../headerwithbackicon/header';
import ToggleSwitch from '../../../../toggleswitch/toggleswitch';
import DatePicker from '../../../../datepicker/datepicker';
import { ReactComponent as ArrowDown } from '../../../../../assets/arrow-down.svg';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '0',
      transform: 'translate(-50%, -50%)',
      width:'80%'
    },
  };
const EditCareer = ({user}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const location = useLocation();
    const [editCareer, setEditCareer] = useState(user.careers[location.state.careerId]);
    const [datePickerRef, setDatePickerRef] = useState('');
    const startedDateRef = useRef();
    const endedDateRef = useRef();
    const navigate = useNavigate();
    const openTimeModal = (name) => {
        setIsOpen(true);
        name === 'startedDate' ? setDatePickerRef(startedDateRef) : setDatePickerRef(endedDateRef);
    }
    const closeTimeModal = () =>{
        setIsOpen(false);
    }

    const onDateChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const date = datePickerRef.current.value.split('-');
        console.log(value);
        if(name === 'year'){
            datePickerRef.current.value = `${value}-${date[1]}`;
            setEditCareer({...editCareer,[datePickerRef.current.name]:datePickerRef.current.value});
        }else{
            datePickerRef.current.value = `${date[0]}-${value}`;
            setEditCareer({...editCareer,[datePickerRef.current.name]:datePickerRef.current.value});
        }
    }
    const handleInputChange = ({target}) => {
        const name = target.name;
        const value = target.name === 'isWorking' ? target.checked : target.value;
        if(name === 'detail'){
            setEditCareer({...editCareer, ['textCount']: value.length, [name]:value});
        }else{
            setEditCareer({...editCareer, [name]: value});
        }
    }

    const validate = (values) =>{
        let errors = {};
        if(!values.place){
            errors.place = '일한 곳의 상호명을 입력해주세요.';
        }

        if(!values.startedDate || (!values.isWorking && !values.endedDate)){
            errors.date = '종료일과 시작일을 선택해주세요.'
        }

        if(values.startedDate && !values.isWorking){
            const started = values.startedDate.split('-');
            const ended = values.endedDate.split('-');
            if (parseInt(started[0]) > parseInt(ended[0])) {
                errors.date = '시작 연도는 종료 연도 이전으로 선택해주세요.'
            }
    
            if (parseInt(started[0]) <= parseInt(ended[0]) && parseInt(started[1]) > parseInt(ended[1])) {
                errors.date = '시작 월은 종료 월 이전으로 선택해주세요. '
            }
        }

        if(values.detail.length > 1000){
            errors.detail = '최대 1000자까지 입력할 수 있어요.';
        }
        return errors;
    }
    //setState해주고 바로 update되지 않은 문제 useEffect 이용하여 해결
    useEffect(()=>{
        setFormErrors(validate(editCareer));
    },[editCareer]);

    const careerHandler = (e) => {
        e.preventDefault();
        if (Object.keys(formErrors).length === 0) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            userData.careers[location.state.careerId] = editCareer;
            localStorage.setItem('userData',JSON.stringify(userData));
            navigate(-1);
        }
    }
    return (
        <>
            <Header title={'경력 추가'} />
            <div className={styles.container}>
                <div className={styles.inputBox}>
                    <div className={styles.title}>
                        일한 곳
                    </div>
                    <input
                        className='inputBox'
                        type='text'
                        placeholder='일한 곳 이름을 알려주세요.'
                        name='place'
                        onChange={handleInputChange}
                        value={editCareer.place}
                    />
                    <span className={styles.errormsg}>{formErrors.place}</span>
                </div>
                <div className={styles.inputBox}>
                    <div className={styles.title}>
                        일한 기간
                    </div>
                    <div className={styles.subTitle}>
                        <div className={styles.text}>현재 일하는 중</div>
                        <ToggleSwitch name={'isWorking'} value={editCareer.isWorking} onChange={handleInputChange} />
                    </div>
                    <div className={styles.dateContainer}>
                        <div className={styles.dateBox}>
                            <div className={styles.dateBoxTitle}>시작</div>
                            <div className={styles.popupBtn} onClick={()=>{openTimeModal('startedDate')}}>
                                <input 
                                    name='startedDate'
                                    ref={startedDateRef}
                                    type='text'
                                    className={styles.timeBox}
                                    placeholder='날짜 선택'
                                    value={editCareer.startedDate}
                                    readOnly={true}/>
                                <ArrowDown />
                            </div>
                        </div>
                        <span>~</span>
                        <div className={styles.dateBox}>
                            <div className={`${styles.dateBoxTitle} ${editCareer.isWorking && styles.blockTitle}`}>종료</div>
                            <div className={`${styles.popupBtn} ${editCareer.isWorking && styles.blockPopupBtn}`} onClick={()=>{openTimeModal('endedDate')}}>
                                <input 
                                    name='endedDate'
                                    ref={endedDateRef}
                                    type='text'
                                    className={styles.timeBox}
                                    placeholder='날짜 선택'
                                    value={editCareer.endedDate}
                                    readOnly={true} />
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
                                innerRef={datePickerRef}
                                onChange={onDateChange}/>
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
                            className={`inputBox ${styles.textBox}`}
                            placeholder='어떤 일을 하셨는지 설명해주세요.'
                            name='detail'
                            onChange={handleInputChange}
                            value={editCareer.detail}
                        />
                        <span>
                            <input
                                className={styles.countBox}
                                name='textCount'
                                value={`${editCareer.textCount}/1000`}
                                onChange={handleInputChange}
                                readOnly={true}
                            />
                        </span>
                    </div>
                </div>
                <span className={styles.errormsg}>{formErrors.detail}</span>
                <button className={styles.orangeBtn} onClick={careerHandler}>완료</button>
            </div>
        </>
    );
};

export default EditCareer;