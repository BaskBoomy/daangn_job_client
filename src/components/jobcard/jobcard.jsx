import React, { memo } from 'react';
import styles from './jobcard.module.css';
import {ReactComponent as Calendar} from '../../assets/calendar.svg';
import {ReactComponent as Clock} from '../../assets/clock.svg';
import {ReactComponent as Won} from '../../assets/won.svg';
const JobCard = memo(
    ({job,onJobCardClick})=>{
        const {_id,title,place,updatedFromUser,salary,pay,date,time,images}= job;
        return(
            <li className={styles.job} onClick={() => onJobCardClick(_id)}>
                <div className={styles.jobHeader}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{place.dong} - 끌올 {updatedFromUser}분 전</div>
                </div>
                <div className={styles.jobBody}>
                    <div className={styles.jobBodyLeft}>
                        <div className={styles.jobinfo}>
                            <Won className={styles.icon}/>
                            <span className={styles.textbold}>{salary} {pay}원</span>
                        </div>
                        <div className={styles.jobinfo}>
                            <Clock className={styles.icon}/>
                            <span>{date}</span>
                        </div>
                        <div className={styles.jobinfo}>
                            <Calendar className={styles.icon}/>
                            <span>{time}</span>
                        </div>
                    </div>
                    <div className={styles.jobBodyRight}>
                        <img className={styles.jobImage} src={images[0].fileURL} alt='test'/>
                    </div>
                </div>
            </li>
        );
    }
)

export default JobCard;