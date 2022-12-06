import React, { useEffect, useState } from 'react';
import styles from './write.module.css';
import Header from '../../../headerwithbackicon/header';
import { useNavigate } from 'react-router-dom';
import GeneralInfo from './generalinfo/generalinfo';
import Career from './career/career';
import SelfIntroduction from './selfintroduction/selfintroduction';
import { useAuth } from '../../../../context/AuthContext';
const Write = ({ FileInput, InputValidation, ImageUploader }) => {
    const { update } = useAuth();
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [formInputData, setFormInputData] = useState({
        name: userData.name ? userData.name : '',
        image: userData.image ? userData.image : undefined,
        borndate: userData.borndate ? userData.borndate : '',
        gender: userData.gender ? userData.gender : '',
        careers: userData.careers ? userData.careers : '',
        selfIntroduction: userData.selfIntroduction ? userData.selfIntroduction : '',
        phoneNumber: userData.phoneNumber ? userData.phoneNumber : ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateLocalUserData = () => {
        localStorage.setItem('userData', JSON.stringify(formInputData));
    }
    const deleteCareer = (careerId) => {
        setFormInputData((current)=>{
            const careers = {...current.careers};
            delete careers[careerId];
            return {...current, careers};
        })
    }
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormInputData((current) => ({ ...current, [name]: value }));
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormErrors(InputValidation.generalInfo(formInputData));
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            update(formInputData);
            navigate(-1);
        }
    }, [formErrors]);

    const backHandler = () => {
        localStorage.removeItem('userData');
        navigate(-1);
    }

    const onFileDelete = () => {
        setFormInputData((current) => ({ ...current, image: {} }));
    }

    const onFileChange = (image) => {
        setFormInputData((current) => ({ ...current, image:image[0] }));
    };
    return (<>{
        loading ?
            (<div className={styles.loadingBox}>
                <div className={styles.loading}></div>
                <div className={styles.loadingText}>프로필 수정중입니다..</div>
            </div>)
            :
            (<>
                <Header title='프로필 수정' backHandler={backHandler} />
                <form>
                    <div className={styles.container}>
                        <FileInput
                            image={[formInputData.image]}
                            maxImage={1}
                            onFileChange={onFileChange}
                            onDelete={onFileDelete} />
                        <GeneralInfo
                            handleInputChange={handleInputChange}
                            formInputData={formInputData}
                            errorMessage={formErrors} />
                        <Career
                            formInputData={formInputData}
                            InputValidation={InputValidation}
                            updateLocalUserData={updateLocalUserData}
                            deleteCareer={deleteCareer} />
                        <SelfIntroduction
                            handleInputChange={handleInputChange}
                            value={formInputData.selfIntroduction}
                            errorMessage={formErrors} />
                    </div>
                    <div className={styles.bottomFix}>
                        <button className={styles.submitBtn} onClick={handleFormSubmit}>작성완료</button>
                    </div>
                </form>
            </>)}</>);
}

export default Write;