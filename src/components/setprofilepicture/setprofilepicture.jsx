import React,{useState} from 'react';
import styles from './setprofilepicture.module.css';
import Header from '../headerwithbackicon/header';
import ImageBox from '../imagebox/imagebox';
import BottomSheet from "../bottomsheet/bottomsheetbody";
import { useNavigate } from 'react-router-dom';
const SetProfilPicture = (props) => {
    const [open, setOpen] = useState();
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Header title={'사진 등록'}/>
            <p className={styles.title}>사진 <span>(선택)</span></p>
            <ImageBox setOpen={setOpen}/>
            <button className={styles.orangeBtn} onClick={()=>navigate(-1)}>완료</button>
            <BottomSheet categoryNo={5} open={open} setOpen={setOpen}></BottomSheet>
        </div>
    );
}

export default SetProfilPicture;