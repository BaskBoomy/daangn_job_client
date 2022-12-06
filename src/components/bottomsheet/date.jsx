import React from 'react';
import styles from './date.module.css';
import { ReactComponent as Reload } from '../../assets/reload.svg';
import { useState } from 'react';
const Date = ({JobRepository,setOpen,setJobs}) => {
    const searchType = JSON.parse(localStorage.getItem('searchType')) ? JSON.parse(localStorage.getItem('searchType')) : {};
    const [date, setDate] = useState(searchType.dates ? searchType.dates : JobRepository.getDays());

    const onChange = (e) => {
        setDate((current)=>{
            const newDates = [...current];
            newDates.map(x=>{
                if(x.id === parseInt(e.target.value)){
                    x.clicked = !x.clicked;
                }
            })
            return newDates;
        })
    }
    const onReset = () => {
        setDate((current)=>{
            const newDates = [...current];
            newDates.map(x=>x.clicked = false);
            return newDates;
        })
    }
    const onSubmit = async () => {
        searchType.dates = date
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
            <div className={styles.title}>일하는 요일</div>
            <div className={styles.dateWrapper}>
                <ul className={styles.datesList}>
                    {
                        date.map(x=>(
                            <li key={x.id}>
                                <input
                                    id={x.id}
                                    className={styles.dayBox}
                                    type='checkbox'
                                    value={x.id}
                                    checked={x.clicked}
                                    onChange={onChange}/>
                                <label 
                                    htmlFor={x.id}
                                    className={x.clicked ? `${styles.clicked}` : `${styles.unClicked}`}>{x.day}</label>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={styles.bts}>
                <button className={styles.btnLeft} onClick={onReset}>
                    <Reload width='15' height='15' fill='#ed7733' className={styles.reloadIcon}/>
                    초기화
                </button>
                <button className={styles.btnRight} onClick={onSubmit}>
                    적용하기
                </button>
            </div>
        </div>
    );
}

export default Date;