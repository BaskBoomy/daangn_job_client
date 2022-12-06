import React from 'react';
import styles from './searchjobs.module.css';
import SearchCategory from '../searchcategory/searchcategory';
const SearchJobs = ({JobRepository,setJobs}) => {
    const searchHandler = ({target}) => {
        //검색어도 localStorage에 저장
        const searchType = localStorage.getItem('searchType') ? JSON.parse(localStorage.getItem('searchType')) : {};
        const text = target.value;
        if(text){
            searchType.text = text;
        }
        if(!text && searchType.text){
            delete searchType.text;
        }
        localStorage.setItem('searchType', JSON.stringify(searchType));
        JobRepository.search(searchType)
            .then((jobs)=>{
                setJobs(jobs);
            })
    }
    return (
        <div className={styles.searchbox}>
            <input 
                type='text' 
                placeholder='(지역명) 주변 알바 검색' 
                className={styles.inputbox}
                onChange={searchHandler}/>
            <div className={styles.categories}>
                <SearchCategory JobRepository={JobRepository} setJobs={setJobs}/>
            </div>

        </div>
    )
};

export default SearchJobs;