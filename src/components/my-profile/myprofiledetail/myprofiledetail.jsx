import React,{useState,useEffect,memo} from 'react';
import styles from './myprofiledetail.module.css';
import Header from '../../headerwithbackicon/header';
import MyProfileDetailInfo from '../myprofiledetailinfo/myprofiledetailinfo';
import ProfileNotFiled from '../profilenotfiled/profilenotfiled';
import ProfileProcess from '../profileprocess/profileprocess';
import { useNavigate } from 'react-router-dom';
const MyProfileDetail = memo(({InfoRepository,user}) => {
    const [infoBtns, setInfoData] = useState(InfoRepository.getInfoBtns());
    const [notFiledData, setNotFiledData] = useState([]);
    const navigate = useNavigate();
    const editInfoPage = (id) => {
        const editPrfoileUrl = '/my-profile-detail/editprofile';
        const headerTitle = infoBtns.find(item => item.id === id).btnTitle;
        /*
        button id 4개
        1 : 기본 정보
        2 : 사진 등록
        3 : 자기소개 등록
        4 : 경력/경험 등록
        */
        id===1 && navigate(editPrfoileUrl,{state:{'page':'generalInfo','headerTitle':headerTitle}});
        id===2 && navigate(editPrfoileUrl,{state:{'page':'setProfilePicture','headerTitle':headerTitle}});
        id===3 && navigate(editPrfoileUrl,{state:{'page':'selfIntroduction','headerTitle':headerTitle}});
        if(id===4){
            navigate(editPrfoileUrl,{state:{'page':'career','headerTitle':headerTitle}});
            localStorage.setItem('userData', JSON.stringify(user));
        }
    }
    useEffect(()=>{
        InfoRepository.updateInfoStatus(user);
        setInfoData(()=>{
            return infoBtns.sort((a,b)=>{
                if(a.isWritten > b.isWritten) return 1;
                if(a.isWritten < b.isWritten) return -1;
                return 0;
            });
        })
        setNotFiledData(()=>{
            return infoBtns.filter(e=>e.isWritten === false);
        })
    },[InfoRepository,infoBtns,user]);
    
    return(
        <div className={styles.container}>
            <Header title={'당근알바 프로필'}/>
            <MyProfileDetailInfo user={user}/>
            <ProfileProcess infoBtns={infoBtns} editInfoPage={editInfoPage}/>
            <ProfileNotFiled notFiledData={notFiledData} editInfoPage={editInfoPage}/>
            {/* 아직 작성안한 프로필 개수 만큼 ProfileCard 생성하기 */}
        </div>
    );
});

export default MyProfileDetail;