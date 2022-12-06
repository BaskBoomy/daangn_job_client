import React, { useState } from 'react';
import styles from './place.module.css';
import Slider from '@mui/material/Slider';
import { ReactComponent as Reload } from '../../assets/reload.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const sliderTheme = {
    color: '#ed7733',
    '& .MuiSlider-thumb': {
        backgroundColor: 'white',
        boxShadow: '3px 3px 3px 0px rgba(58, 133, 137, 0.16)'
    },
    '& .MuiSlider-rail': {
        backgroundColor: '#efefef',
    },
    '& .MuiSlider-mark': {
        backgroundColor: 'white',
        width: '2px',
        height: '100%'
    }
}
const Place = ({ setOpen, nearAddress, getPartAddress, getSliderValue, range, JobRepository, setJobs }) => {
    const {user} = useAuth();
    const searchType = JSON.parse(localStorage.getItem('searchType')) ? JSON.parse(localStorage.getItem('searchType')) : {};
    const navigate = useNavigate();
    const [place, setPlace] = useState(searchType.place ? getSliderValue(searchType.place.length) : nearAddress.length);
    const handleChange = (event, newValue) => {
        setPlace(getSliderValue(newValue));
    }
    const navigateToNearAddress = () => {
        navigate('/nearAddress',
            {
                state: {
                    address: {
                        size: nearAddress.length,
                        part: getPartAddress()
                    }
                }
            })
    }

    const onReset = () => {
        searchType.place = {};
        localStorage.setItem('searchType', JSON.stringify(searchType));
    }
    const onSubmit = async () => {
        //동네 범위별로 동 이름을 localstorage에 저장
        searchType.place = getPartAddress(getSliderValue(place, true)).map(x => {
            const split = x.address.split(' ');
            if (split.length > 2) return split[2];
            else return split[1];
        });
        localStorage.setItem('searchType', JSON.stringify(searchType));
        await JobRepository.search(searchType)
            .then((data) => {
                setJobs(data);
                setOpen(false);
            })
    }
    return (
        <div className={styles.content}>
            <div className={styles.title}>동네 범위</div>
            <div className={styles.subtitle} onClick={navigateToNearAddress}>
                {`${user.myplace.address.split(' ')[2]} 외 근처 동네 ${place}개`}
            </div>
            <Slider
                onChange={handleChange}
                min={range[0].value}
                max={nearAddress.length}
                defaultValue={nearAddress.length}
                value={place}
                sx={sliderTheme}
                marks={range}
            />
            <div className={styles.sliderLabel}>
                <span className={styles.floatleft}>내 동네</span>
                <span className={styles.floatright}>먼 동네</span>
            </div>
            <div className={styles.bts}>
                <button className={styles.btnLeft} onClick={onReset}>
                    <Reload width='15' height='15' fill='#ed7733' className={styles.reloadIcon} />
                    초기화
                </button>
                <button className={styles.btnRight} onClick={onSubmit}>
                    적용하기
                </button>
            </div>
        </div>
    );
}

export default Place;