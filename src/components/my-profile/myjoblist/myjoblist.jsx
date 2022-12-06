import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myjoblist.module.css';
import JobCard from '../../jobcard/jobcard.jsx';

const MyJobList = ({ list }) => {
    const navigate = useNavigate();
    const onJobCardClick = (id) => navigate(`/job-post`,{state:{postId:id}});
    return (
        <>
            {
                Object.keys(list).length <= 0 ? <p>존재하지 않음</p>
                    :
                    <ul className={styles.jobs}>
                        {Object.keys(list).map(key => (
                            <JobCard
                                key={key}
                                job={list[key]}
                                onJobCardClick={onJobCardClick}
                            />
                        ))}
                    </ul>
            }

        </>

    );
}
export default MyJobList;