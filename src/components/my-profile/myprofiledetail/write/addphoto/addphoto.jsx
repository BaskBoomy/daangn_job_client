import React, { memo } from 'react';
import styles from './addphoto.module.css';
import { ReactComponent as Camera } from '../../../../../assets/camera.svg';
const AddPhoto = memo(({ image, onClick, onDelete, subTitle, maxImage }) => {
    return (
        <div className={styles.box}>
            <div className={styles.title}>
                사진 <span>(선택)</span>
            </div>
            {
                subTitle &&
                <div className={styles.subTitle}>
                    {subTitle}
                </div>
            }
            <div className={styles.boxContent}>
                <div className={`${styles.smallBox} ${styles.addPhotoBtn}`} onClick={onClick}>
                    <Camera fill='gray' className={styles.icon} />
                    <div className={styles.graySmallText}>{Object.keys(image).length}/{maxImage}</div>
                </div>
                {
                    Object.keys(image).map(key => {
                        if (key < maxImage) {
                            return (
                                <div className={styles.smallBox} key={key}>
                                    <img alt='profile' src={image[key].fileURL} />
                                    <span className={styles.tinyBtn} onClick={() => onDelete(key,image[key].public_id)}>x</span>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    );
})

export default AddPhoto;