import React from 'react';
import NotFiledInfoCard from '../notfiledinfocard/notfiledinfocard';
import styles from './profilenotfiled.module.css';

const ProfileNotFiled = ({notFiledData,editInfoPage}) => {
    return (
        <ul className={styles.cards}>
            {notFiledData.map((item)=>(
                <NotFiledInfoCard
                    key={item.id}
                    info={item}
                    editInfoPage={editInfoPage}
                />
            ))}
        </ul>
    );
}

export default ProfileNotFiled;