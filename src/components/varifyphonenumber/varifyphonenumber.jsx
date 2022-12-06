import React from 'react';
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../headerwithbackicon/header';
import styles from './varifyphonenumber.module.css';

const VarifyPhoneNumber = ({ AuthService }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {logIn} = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneRef = useRef();
    const codeRef = useRef();
    const [isCodeSend, setIsCodeSend] = useState(false);
    const sendCode = () => {
        AuthService
            .sendSMSCode(phoneNumber)
            .then((data) => {
                if (data.result === 200) {
                    setIsCodeSend(true);
                }
            })
    }
    const verifyCode = () => {
        AuthService
            .verifySMSCode(codeRef.current.value,phoneNumber)
            .then(async (data) => {
                if (data.result === 200) {
                    const userData = JSON.parse(localStorage.getItem('userData'));
                    //로그인일 경우
                    if(location.state.isLogIn){
                        logIn(phoneNumber.replace(/-/g,""));
                    }
                    //회원가입일 경우
                    else{
                        localStorage.setItem('userData', JSON.stringify({ ...userData, phoneNumber:phoneNumber.replace(/-/g,""),isVarified: true }));
                        navigate('/setMyProfile');
                    }
                } else {
                    console.log(data);
                    alert(data.message);
                }
            })
    }
    const autoHyphen = ({ target }) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(target.value)) {
            setPhoneNumber(target.value);
        }
    }
    useEffect(() => {
        if (phoneNumber.length === 10) {
            setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNumber.length === 13) {
            setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
      }, [phoneNumber]);
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.title}>휴대폰 번호를 인증해주세요.</div>
                <div className={styles.subTitle}>당근마켓은 휴대폰 번호로 가입해요. 번호는 안전하게 보관되어 어디에도 공개되지 않아요.</div>
                <input
                    ref={phoneRef}
                    className={styles.input}
                    type="text"
                    placeholder='휴대폰 번호를 입력하세요'
                    maxLength="13"
                    value={phoneNumber}
                    onChange={autoHyphen}/>
                {
                    isCodeSend &&
                    (
                        <div>
                            <input
                                ref={codeRef}
                                className={styles.input}
                                type="number"
                                placeholder='인증 번호를 입력하세요'
                                maxLength="6" />
                            <button className='btnOrange' onClick={verifyCode}>확인</button>
                            <button className={styles.grayBtn} onClick={sendCode}>인증문자 재전송</button>
                        </div>
                    )
                }
                {
                    !isCodeSend &&
                    (
                        <button className={styles.grayBtn} onClick={sendCode}>인증문자 받기</button>
                    )
                }
                <div className={styles.smallText}>휴대폰 번호가 변경되었나요? <a href='#'>이메일로 계정찾기</a></div>
            </div>
        </>
    );
}

export default VarifyPhoneNumber;