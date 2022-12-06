import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../headerwithbackicon/header';
import styles from './setmyprofile.module.css';

const SetMyProfile = ({ ImageUploader,AuthService }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [nickname, setNickName] = useState('');
    const [image, setImage] = useState(undefined);
    const inputRef = useRef();
    const { signUp } = useAuth();
    const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }
    const onChange = async (event) => {
        setLoading(true);
        await ImageUploader.upload(event.target.files)
            .then((data) => {
                console.log(data);
                setImage({
                    fileURL : data[0].fileURL,
                    public_id : data[0].public_id
                });
            });
        setLoading(false);
    }

    const onChangeHandler = ({ target }) => {
        setNickName(target.value);
    }
    const submitHandler = async () => {
        if(!image){
            alert('프로필 사진을 등록해주세요!');
            return;
        }

        if(!nickname){
            alert('닉네임을 입력해주세요!');
            return;
        }
        const userData = JSON.parse(localStorage.getItem('userData'));
        await signUp(userData.myplace,userData.phoneNumber,image,nickname);
    }
    return (
        <>
            <Header title='프로필 설정' />
            <div className={styles.container}>
                <div className={styles.profileImage}>
                    <input ref={inputRef} className={styles.input} type="file" accept="image/*" name="file" onChange={onChange} />
                    {!loading && (
                        <div className={styles.imageBox} onClick={onButtonClick}>
                            <div className={styles.defaultImage}>
                                {image ?
                                    <img className={styles.image} alt='my profile image' src={image.fileURL} />
                                    :
                                    <>
                                        <img className={styles.image} alt='default image' src='/images/adult.png' />
                                        <img className={styles.absoluteImage} alt='camera' src='/images/camera.png' />
                                    </>
                                }
                            </div>
                        </div>
                    )}
                    {loading && <div className={styles.loading}></div>}
                </div>
                <div className={styles.nickName}>
                    <input
                        className={styles.nickNameInput}
                        type='text'
                        placeholder='닉네임을 입력해주세요.'
                        name='nickname'
                        value={nickname}
                        onChange={onChangeHandler} />
                </div>
                <button className='btnOrange' onClick={submitHandler}>완료</button>
            </div>

        </>
    );
}

export default SetMyProfile;