import React,{memo} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myprofiledetailinfo.module.css';
import { ReactComponent as Info } from '../../../assets/info.svg';
import ImageBox from '../../imagebox/imagebox';
const MyprofileDetailInfo = memo(({user}) => {
    const navigate = useNavigate();
    const goToProfileSetting = () => {
        localStorage.setItem('userData',JSON.stringify(user));
        navigate('/my-profile-detail/write');
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.topbox}>
                    <ImageBox path={'/profile-picture'} image={user.image.fileURL}/>
                    <div className={styles.right}>
                        <div className={styles.title}>{user.name ? user.name : '이름 없음'} <span>36.8℃</span></div>
                        <div className={styles.textGray}>
                            {user.gender && user.gender+'·'}
                            {user.age && user.age + '·'}
                            {user.myplace.address ? user.myplace.address.split(' ')[2] : ''} 
                             인증 5회
                        </div>
                        <div className={styles.textGray}>{user.phoneNumber} <Info className={styles.smallicon} /></div>
                        <div className={styles.colorOrange}>추천 0</div>
                    </div>
                </div>
            <button className={styles.btnGray} onClick={goToProfileSetting}>프로필 수정</button>
            </div>
        </>
    );
});

export default MyprofileDetailInfo;