import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './imagebox.module.css';
import {ReactComponent as Camera} from '../../assets/camera.svg';
import {useAuth} from '../../context/AuthContext';
const ImageBox = ({path,setOpen,image}) => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const onClickHandler = () => {
        path && navigate(path);
        setOpen && setOpen(true);
    } 
    return (
        <div className={styles.container}>
            <div className={styles.imageBox} onClick={onClickHandler}>
                <img className={styles.profileImage} alt='profile' src={user.image.fileURL} />
                <Camera className={styles.floatIcon} />
            </div>
        </div>
    );
}

export default ImageBox;