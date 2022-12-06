import React,{useState} from 'react';
import styles from './myprofileshortinfo.module.css';
import {ReactComponent as AlarmOff} from '../../../assets/alarm-off.svg';
import {ReactComponent as AlarmOn} from '../../../assets/alarm-on.svg';
import BottomSheet from "../../bottomsheet/bottomsheetbody";
import { useAuth } from '../../../context/AuthContext';
const MyProfileShortInfo = ({user}) => {
    console.log(user);
    const [open, setOpen] = useState(false);
    const [categoryNo, setCategoryNo] = useState(0);
    const {update} = useAuth();
    const AlarmHandler = () => {
        const data = {
            jobAlarm : !user.jobAlarm,
        }
        update(data);
    }
    return(
        <div className={styles.infobox}>
            <div className={styles.left}>
                <img className={styles.image} src={user.image ? user.image.fileURL : '/public/images/user.png'} alt='myprofile'/>
                <div className={styles.content}>
                    <div className={styles.text1}>{user.name ? user.name : <span>이름 없음</span>}</div>
                    <div className={styles.text2}>{user.nickname}</div>
                </div>
            </div>
            {user.jobAlarm ? 
            <AlarmOn className={styles.right} onClick={()=>{setOpen(!open);setCategoryNo(4)}}/> : 
            <AlarmOff className={styles.right} onClick={()=>{setOpen(!open);setCategoryNo(3)}}/>} 
             
            <BottomSheet categoryNo={categoryNo} open={open} setOpen={setOpen} AlarmHandler={AlarmHandler}></BottomSheet>
        </div>
    );
}

export default MyProfileShortInfo;