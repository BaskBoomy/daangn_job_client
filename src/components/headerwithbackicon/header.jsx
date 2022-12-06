import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { ReactComponent as XIcon } from '../../assets/x.svg';
const MyProfileHeader = ({ title, backHandler, iconWithX, btnTitle, btnLink }) => {
    const navigate = useNavigate();
    const backClickHandler = () => {
        backHandler != null ? backHandler() : navigate(-1);
    }
    return (
        <header className={styles.header}>
            <div>
                {iconWithX ?
                    <XIcon onClick={backClickHandler} className={styles.iconbtn} /> :
                    <ArrowLeft onClick={backClickHandler} className={styles.iconbtn} />}
                <div className={styles.title}>{title}</div>
            </div>
            {btnTitle &&
                <a className={styles.rightBtn} href={btnLink}>{btnTitle}</a>}
        </header>
    );
}

export default MyProfileHeader;