import React, { useState } from 'react';
import styles from './workpay.module.css';
import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)',
        width:'80%',
        padding:'0'
    },
};
const WorkPay = ({value,onChange,error}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const radioHandler = (e) =>{
        onChange({
            target:{
                name:'payType',
                value:e.target.value,
            }
        });
    }
    return (
        <>
        <div className={styles.container}>
            <div className={styles.box} onClick={openModal}>
                <input
                    className={styles.inputBox}
                    type='text'
                    name='payType'
                    value={value.payType}
                    onChange={onChange}
                    readOnly={true}/>
                <ArrowDown />
            </div>
            <div className={styles.box}>
                <input
                    className={styles.inputBox}
                    type='number'
                    name='pay'
                    placeholder={process.env.REACT_APP_KOREA_MINIMUM_WAGE}
                    value={value.pay}
                    onChange={onChange}/>
                <div>원</div>
            </div>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <div className={styles.modalBody}>
                    <label htmlFor='type1' className={styles.label}>월급<input type='radio' id='type1' name='type' value='월급' onChange={radioHandler}/></label>
                    <label htmlFor='type2' className={styles.label}>일급<input type='radio' id='type2' name='type' value='일급' onChange={radioHandler}/></label>
                    <label htmlFor='type3' className={styles.label}>시급<input type='radio' id='type3' name='type' value='시급' onChange={radioHandler}/></label>
                    <label htmlFor='type4' className={styles.label}>건당<input type='radio' id='type4' name='type' value='건당' onChange={radioHandler}/></label>
                </div>
            </Modal>
        </div>
        
        <div className='errorMessage'>{error}</div>
        </>
    );
}

export default WorkPay;