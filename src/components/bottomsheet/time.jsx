import React, { useState } from "react";
import Slider from '@mui/material/Slider';
import styles from './time.module.css';
import { ReactComponent as Reload } from '../../assets/reload.svg';

const Time = ({setOpen,JobRepository,setJobs}) => {
    const searchType = JSON.parse(localStorage.getItem('searchType')) ? JSON.parse(localStorage.getItem('searchType')) : {};
    const [startTime, setStartTime] = useState(searchType.time ? searchType.time.startTime : 0);
    const [endTime, setEndTime] = useState(searchType.time ? searchType.time.endTime : 24);
    const [value, setValue] = useState([startTime, endTime]);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
        setStartTime(newValue[0]);
        setEndTime(newValue[1]);
    };

    const sliderTheme = {
        color:'#ed7733',
        '& .MuiSlider-thumb': {
            backgroundColor: 'white',
            boxShadow:'3px 3px 3px 0px rgba(58, 133, 137, 0.16)'
        },
        '& .MuiSlider-rail': {
            backgroundColor: '#efefef',
        }
    }
    const onReset = () => {
        handleChange(null,[0,24]);
    }
    const onSubmit = async () => {
        const time = {startTime,endTime};
        searchType.time = time;
        localStorage.setItem('searchType', JSON.stringify(searchType));
        await JobRepository.search(searchType)
            .then((data) => {
                console.log(data);
                setJobs(data);
                setOpen(false);
            })
    }
    return(
        <div className={styles.content}>
            <div className={styles.title}>일하는 시간</div>
            <div className={styles.time}>
                <span>{startTime}</span>시 ~ <span>{endTime}</span>시
            </div>
            <Slider
                value={value}
                onChange={handleChange}
                sx={sliderTheme}
                min={0}
                max={24}
            />
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

export default Time;