import React,{useState, useEffect, memo} from "react";
import 'react-spring-bottom-sheet/dist/style.css';
import styles from './alljobs.moduel.css';
import Header from '../header/header';
import SearchJobs from '../searchjobs/searchjobs'
import Jobs from '../jobs/jobs'
const AllJobs = memo(({JobRepository,logoutHandler}) => {
    const [jobs, setJobs] = useState({});
    const searchType = JSON.parse(localStorage.getItem('searchType')) ? JSON.parse(localStorage.getItem('searchType')) : {};
    useEffect(()=>{
        if(Object.keys(searchType).length>0){
            JobRepository.search(searchType).then(((data)=>{
                setJobs(data);
            }));
        }else{
            JobRepository.getJobs().then(((data)=>{
                setJobs(data);
            }));
        }
    },[JobRepository])
    
    return(
        <>
            <div className={styles.main}> 
                <Header JobRepository={JobRepository} logoutHandler={logoutHandler}/>
                <SearchJobs JobRepository={JobRepository} setJobs={setJobs}/>
                <Jobs jobs={jobs}/>
            </div>
        </>
    )
});

export default AllJobs;