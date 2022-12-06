import React,{useState} from 'react';
import styles from './timepicker.module.css';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';

import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)',
        width:'80%',
        padding:'0',
    },
};
const TimePicker = ({startTime,endTime,onChange,TimeService}) => {
    const timeSpan = TimeService.getTimeSpan();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const openModal = (type) => {
        setName(type);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const radioHandler = (e,name) =>{
        onChange({
            target:{
                name:name,
                value:e.target.value,
            }
        });
    }
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.box} onClick={()=>openModal('startTime')}>
                    <div className={styles.title}>시작</div>
                    <div className={styles.timeBox}>
                        <input
                            type='text'
                            className={styles.inputBox}
                            name='startTime'
                            onChange={onchange}
                            value={startTime}
                            readOnly={true}/>
                        <ArrowDown/>
                    </div>
                </div>
                <div className={styles.middle}>
                    <span>~</span>
                </div>
                <div className={styles.box} onClick={()=>openModal('endTime')}>
                    <div className={styles.title}>종료</div>
                    <div className={styles.timeBox}>
                        <input
                            type='text'
                            className={styles.inputBox}
                            name='endTime'
                            onChange={onchange}
                            value={endTime}
                            readOnly={true}/>
                        <ArrowDown/>
                    </div>
                </div>
            </div>
            
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <div className={styles.modalBody}>
                    {
                        timeSpan.map((item,idx)=>(
                            <label key={idx} htmlFor={`time${idx}`} className={styles.label}>
                                {item.time}
                                <input 
                                    type='radio' 
                                    id={`time${idx}`} 
                                    name='time' 
                                    value={item.time} 
                                    checked={(name==='startTime' && startTime === item.time ? true : false) || (name==='endTime' && endTime === item.time ? true : false)}
                                    onChange={(e)=>{radioHandler(e,name)}}/>
                            </label>
                        ))
                    }
                </div>
            </Modal>
        </>
    );
}
export default TimePicker;