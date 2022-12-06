import React from 'react';
import styles from './worktime.module.css';
import TimePicker from '../../timepicker/timepicker';
const WorkTime = ({value, onChange,TimeService}) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>일하는 시간</div>
            <TimePicker
                startTime={value.startTime}
                endTime={value.endTime}
                onChange={onChange}
                TimeService={TimeService}/>
            <div className={styles.bottom}>
                <label htmlFor='negotiable'>
                    <input
                        id='negotiable'
                        type='checkbox'
                        name='negotiable'
                        onChange={onChange}
                        checked={value.negotiable}
                        value={value.negotiable}/>
                        협의가능
                </label>
            </div>
        </div>
    );
}

export default WorkTime;