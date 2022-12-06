import React,{useState} from 'react';
import styles from './career.module.css';
import CareerCard from '../addcareer/careercard';
import BottomSheet from '../../../../bottomsheet/bottomsheetbody';
import { useNavigate } from 'react-router-dom';
const Career = ({formInputData,deleteCareer,updateLocalUserData}) => {
    const [openEditBtns, setOpenEditBtns] = useState(false);
    const [currentCareer, setCurrentCareer] = useState({});
    const navigate = useNavigate();
    const openEditBtsBottomSheet = (id) => {
        setOpenEditBtns(!openEditBtns);
        setCurrentCareer(formInputData.careers[id]);
    }
    const editBtnHandler = () => {
        navigate('/my-profile-detail/write/edit-career',{state:{'careerId':currentCareer.id}});
    }
    const toAddCareer = () =>{
        updateLocalUserData();
        navigate('/my-profile-detail/write/add-career');
    }
    return (
        <>
            <div className={styles.inputBox}>
                <div className={styles.title}>
                    경력 <span>(선택)</span>
                </div>
                {Object.keys(formInputData.careers).map(key => (
                    <CareerCard
                        key={key}
                        id={key}
                        career={formInputData.careers[key]}
                        openEditBtsBottomSheet={openEditBtsBottomSheet}
                    />
                ))}
                <button className={styles.btnGray} onClick={toAddCareer}> + 경력/경험 등록</button>
            </div>
            <BottomSheet categoryNo={6} open={openEditBtns} setOpen={setOpenEditBtns} editBtnHandler={editBtnHandler} careerId={currentCareer.id} deleteCareer={deleteCareer}></BottomSheet>
        </>
    );
}

export default Career;