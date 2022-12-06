import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './myprofile.module.css';
import Header from '../../headerwithbackicon/header';
import MyProfileShortInfo from '../myprofileshortinfo/myprofileshortinfo';
import MyJobList from '../myjoblist/myjoblist';

const MyProfile = ({user,AuthService}) => {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [current, setCurrent] = useState(false);

    const listHandler = () => {
        setCurrent(!current);
    }
    useEffect(()=>{
        if(current){
            AuthService.getLikedList()
                .then((data)=>{
                    setList(()=>{
                        return data;
                    });
                })
        }else{
            // setList(user.appliedList ? [user.appliedList] : []);
        }
    },[current]);

    return(
        <div className={styles.container}>
            <Header title={'당근알바 프로필'}/>
            <MyProfileShortInfo user={user}/>
            <button onClick={()=>navigate('/my-profile-detail')} className={styles.btn}>알바 프로필 관리</button>
    
            <nav>
                <button onClick={listHandler} className={!current ? `${styles.btnActive}` : ''}>내 지원 내역</button>
                <button onClick={listHandler} className={current ? `${styles.btnActive}` : ''}>관심 목록</button>
            </nav>
            <MyJobList list={list}/>
        </div>
    );
}

export default MyProfile;