import React, { useEffect, useState } from 'react';
import styles from './workperiod.module.css';
function orderByDates(a, b) {
    const date1 = new Date(a.fullDate)
    const date2 = new Date(b.fullDate)
    return date1 - date2;
}
const WorkPeriod = ({ value, onChange, DateService, error }) => {
    const workPeriodHandler = () => {
        onChange({
            target: {
                name: 'term',
                value: value.term === 'short' ? 'long' : 'short'
            }
        })
    }
    const currentDate = DateService.getCurrentDate();
    const oneMonthLaterDate = DateService.getAfterOneMonthDate();
    const [dates, setDates] = useState(DateService.getDatesFromToday());
    const [days, setDays] = useState(value.days);

    useEffect(()=>{
        const data = DateService.getDatesFromToday();
        
        for(var i = 0 ; i<data.length ; i++){
            for(var j = 0 ; j<data[i].length;j++){
                for(var z =0; z<value.dates.length; z++){
                    if(data[i][j].id === value.dates[z].id){
                        data[i][j].isSelected = true;
                    }
                }
            }
        }
        setDates(data);
    },[DateService,value])
    const datePickHandler = (date, weekIdx, dateIdx) => {
        // console.log(`${date.year}년 ${date.month}월 ${date.date}일`);
        if (value.dates.find(x => x.id === date.id)) {
            value.dates = value.dates.filter(x => x.id !== date.id);
        } else {
            value.dates.push(date);
        }
        setDates((current) => {
            const newDates = { ...current };
            newDates[weekIdx][dateIdx].isSelected = !newDates[weekIdx][dateIdx].isSelected;
            return current;
        });

        onChange({
            target: {
                name: 'dates',
                value: value.dates.sort(orderByDates)
            }
        })
    }

    useEffect(()=>{
        const data = value.days;
        
    },[value])
    const dayPickHandler = (day) => {
        setDays((current) => {
            const newDays = { ...current };
            newDays[day.id].clicked = !newDays[day.id].clicked;
            return current;
        });

        onChange({
            target: {
                name: 'days',
                value: value.days
            }
        })
    }
    const handleDrag = (e) =>{
        console.log(e);
    }
    return (
        <div className={styles.container}>
            <div className={styles.workperiodBox}>
                <div className={styles.title}>일하는 기간</div>
                <div className={styles.btns}>
                    <div className={value.term === 'short' ? `${styles.isActive}` : `${styles.btn}`} onClick={workPeriodHandler}>단기</div>
                    <div className={value.term === 'short' ? `${styles.btn}` : `${styles.isActive}`} onClick={workPeriodHandler}>1개월 이상</div>
                </div>
            </div>
            <div className='errorMessage'>
                {error && value.term === 'short' ? error.dates : error.days}
            </div>
            <div className={styles.workperiodBox}>
                {
                    value.term === 'short' ?
                        <>
                            <div className={styles.title}>일하는 날짜</div>
                            <div className={styles.calender}>
                                <div className={styles.calenderTitle}>{currentDate} ~ {oneMonthLaterDate}</div>
                                <div className={styles.calenderBody}>
                                    <table className={styles.top}>
                                        <thead>
                                            <tr>
                                                <td>일</td>
                                                <td>월</td>
                                                <td>화</td>
                                                <td>수</td>
                                                <td>목</td>
                                                <td>금</td>
                                                <td>토</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dates.map((week, weekIdx) => (
                                                    <tr key={weekIdx}>
                                                        {
                                                            week.map((date, dateIdx) => {
                                                                if (date.isActive) {
                                                                    if (date.day === 0 || date.isHoliday) {
                                                                        return <td
                                                                            key={dateIdx}
                                                                            onClick={() => datePickHandler(date, weekIdx, dateIdx)}>
                                                                            <span className={date.isSelected ? `${styles.isSelected}` : `${styles.textOrange}`}>{date.date}</span>
                                                                        </td>
                                                                    }
                                                                    return <td
                                                                        key={dateIdx}
                                                                        onClick={() => datePickHandler(date, weekIdx, dateIdx)}>
                                                                        <span className={date.isSelected ? `${styles.isSelected}` : `${styles.textBlack}`}>{date.isToday ? '오늘' : date.date}</span>
                                                                    </td>
                                                                }
                                                                else {
                                                                    return <td
                                                                        key={dateIdx}>
                                                                        <span className={date.isSelected ? `${styles.isSelected}` : `${styles.textGray}`}>{date.date}</span>
                                                                    </td>
                                                                }
                                                            })
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className={styles.title}>일하는 요일</div>
                            <ul className={styles.dayOfWeekBox}>
                                {
                                    days.map((item, idx) => {
                                        if (item.clicked) {
                                            return (
                                                <li key={idx} className={styles.dayIsActive} onClick={() => { dayPickHandler(item) }}>{item.day}</li>
                                            )
                                        } else {
                                            return (
                                                <li key={idx} className={styles.day} onClick={() => { dayPickHandler(item) }}>{item.day}</li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </>
                }

            </div>
        </div>
    );
}

export default WorkPeriod;