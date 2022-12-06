import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './jobs.module.css';
import JobCard from '../jobcard/jobcard.jsx';
const Jobs = ({jobs}) => {
    const navigate = useNavigate();
    const onJobCardClick = (postId) => {
        navigate(`/job-post`,{state:{postId}});
    };
    return(
        <>
        {Object.keys(jobs).length === 0 && <p className={styles.jobsEmpty}>등록된 알바가 없습니다.</p>}
        <ul className={styles.jobs}>
            {Object.keys(jobs).map((key)=>(
                <JobCard
                key={jobs[key]._id}
                job={jobs[key]}
                onJobCardClick={onJobCardClick}
                />
            ))}
        </ul>
        </>
    );
}

export default Jobs;