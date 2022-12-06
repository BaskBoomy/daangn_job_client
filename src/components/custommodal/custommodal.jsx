import React, { useEffect } from 'react';
import Modal from 'react-modal';
import Header from '../headerwithbackicon/header';
import styles from './custommodal.module.css';
Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '51.5%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%'
    },
};
const CustomModal = ({headerTitle, ModalComponent, isOpen, closeModal }) => {
    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                {headerTitle&&<Header title={headerTitle} backHandler={closeModal}/>}
                <div className={styles.modalBody}>
                    <ModalComponent/>
                </div>
            </Modal>
        </>
    );
}

export default CustomModal;