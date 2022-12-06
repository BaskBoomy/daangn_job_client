import React, { useEffect, useState } from 'react';
import styles from './editprofile.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../headerwithbackicon/header';
import GeneralInfo from '../myprofiledetail/write/generalinfo/generalinfo';
import Career from '../myprofiledetail/write/career/career';
import SelfIntroduction from '../myprofiledetail/write/selfintroduction/selfintroduction';
import SetProfilPicture from '../../setprofilepicture/setprofilepicture';
import AddCareer from '../myprofiledetail/write/addcareer/addcareer';
const EditProfile = ({ user, InputValidation, update }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { page, headerTitle } = location.state;
    const [formInputData, setFormInputData] = useState(user);
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const inputFieldValue = e.target.value;
        const inputFieldName = e.target.name;
        const NewInputValue = { ...formInputData, [inputFieldName]: inputFieldValue };
        setFormErrors(InputValidation.generalInfo(NewInputValue));
        setFormInputData(NewInputValue);

    }

    useEffect(() => {
        setFormErrors(InputValidation.generalInfo(formInputData));
    }, [setFormErrors,InputValidation,formInputData])

    const onSubmitHandler = () => {
        if (Object.keys(formErrors).length === 0) {
            const updateData = {
                name : formInputData.name,
                phoneNumber : formInputData.phoneNumber,
                gender : formInputData.gender,
                borndate : formInputData.borndate,
                selfIntroduction : formInputData.selfIntroduction
            }
            update(updateData);
            navigate(-1);
        }
    }
    return (
        <>
            <Header title={headerTitle} />
            <div className={styles.container}>
                {page === 'generalInfo' &&
                    <GeneralInfo
                        handleInputChange={handleInputChange}
                        formInputData={formInputData}
                        errorMessage={formErrors}
                        onSubmitHandler={onSubmitHandler} />}

                {page === 'career' &&
                    <AddCareer
                     InputValidation={InputValidation} 
                     update={update}/>
                    // <Career
                    //     formInputData={formInputData}
                    //     InputValidation={InputValidation} />
                        }

                {page === 'selfIntroduction' &&
                    <SelfIntroduction
                        handleInputChange={handleInputChange}
                        value={formInputData.selfIntroduction}
                        errorMessage={formErrors}
                        onSubmitHandler={onSubmitHandler} />}

                {page === 'setProfilePicture' &&
                    <SetProfilPicture/>}
                
            </div>

        </>
    );
}

export default EditProfile;