import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)',
        width:'60%',
        padding:'20px',
        borderRadius:'10px',
        border:'none',
        height:'120px',
        display:'flex',
        alignItems:'center',
    },
    overlay: {
        backgroundColor: "rgb(157 155 155 / 75%)"
    }
};
const Header = ({logoutHandler}) => {
    const navigate = useNavigate();
    const localStore = localStorage.getItem("formInputData");
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    }
    const addJobHandler = () => {
        localStore ? setIsOpen(true) : navigate('/add-job',{state:{'isSaved':false}});
    }
    const startNewPostHandler = () => {
        localStorage.removeItem("formInputData");
        navigate('/add-job',{state:{'isSaved':false}});
    }
    const getSavedPostHandler =() => {
        navigate('/add-job',{state:{'isSaved':true}});
    }
    return (
        <header className={styles.header}>
            <div className={styles.title}>당근 알바</div>
            <div className={styles.btns}>
                <div className={styles.smallText} onClick={logoutHandler}>로그아웃</div>
                <img onClick={()=>navigate('/my-profile')} src='/images/user.png' alt='myprfile' className={styles.iconbtn}/>
                <img onClick={addJobHandler} src='/images/write.png'  alt='addjobs' className={styles.iconbtn}/>
            </div>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <div className={styles.modalBody}>
                    <div className={styles.modalTitle}>작성중인 글이 있어요. 이어서 쓰시겠어요?</div>
                    <div className={styles.modalBtns}>
                        <button className={styles.btnDefault} onClick={startNewPostHandler}>새로 쓰기</button>
                        <button className={styles.btnOrange} onClick={getSavedPostHandler}>이어서 쓰기</button>
                    </div>
                </div>
            </Modal>
        </header>
    )
}

export default Header;