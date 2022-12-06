import React from 'react';
import styles from './addresspicker.module.css';
import {ReactComponent as SearchIcon} from '../../assets/search.svg';
import { useNavigate } from 'react-router-dom';

const AddressPicker = ({value,onChange,error,isSaved}) => {
    const navigate = useNavigate();
    const goToAddressPickerPage = () => {
        navigate('/get-address',{state:{'isSaved':isSaved}});
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>주소</div>
            <div className={styles.inputBoxWithIcon} onClick={goToAddressPickerPage}>
                <input 
                    className={styles.inputBox}
                    type='text'
                    name='place'
                    onChange={onChange}
                    value={value}
                    readOnly={true}/>
                <SearchIcon width={'20px'}/>
            </div>
            <div className='errorMessage'>{error}</div>
        </div>
    );
}

export default AddressPicker;