import React, { useRef, useState,useEffect } from 'react';
import styles from './termsofcompliance.module.css';
import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg';
const TermsOfCompliance = ({ value, onChange,error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const bottomRef = useRef();
    const arrowHandler = () => {
        setIsOpen(!isOpen);
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
    return (
        <div className={styles.container}>
            <div className={styles.checkBox}>
                <div>
                    <label htmlFor='chkbox' className={styles.checkBoxLabel}>
                        <div className={
                            value ?
                                `${styles.checkBoxOrange}` :
                                `${styles.checkBoxDefault}`
                        }></div>
                        <input
                            id='chkbox'
                            type='checkbox'
                            name='isTermsOfComplianceChecked'
                            value={value}
                            checked={value}
                            onChange={onChange}
                            className={styles.checkBoxHide} />
                        <span>당근알바 준수 사항 동의</span>
                    </label>


                </div>
                <ArrowDown onClick={arrowHandler} className={isOpen ? `${styles.arrow}` : `${styles.arrowDown}`} />
            </div>
            {
                isOpen &&
                <div className={styles.listBox} ref={bottomRef} >
                    <ul>
                        <li><a href='#'>최저임금을 지켜주세요.</a></li>
                        <li><a href='#'>근로기준법을 지켜주세요.</a></li>
                        <li><a href='#'>고용차별을 하지 않아요.</a></li>
                        <li><a href='#'>불법 파견을 하지 않아요.</a></li>
                        <li><a href='#'>이밖에 당근알바 이용 주의사항을 확인하세요.</a></li>
                    </ul>
                </div>
            }
            <div className='errorMessage'>{error}</div>
        </div>
    );
}

export default TermsOfCompliance;