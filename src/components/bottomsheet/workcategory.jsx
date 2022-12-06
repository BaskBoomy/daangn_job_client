import React, { useState } from 'react';
import styles from './workcategory.module.css';
import { ReactComponent as Reload } from '../../assets/reload.svg';

const WorkCategory = ({ JobRepository,setOpen,setJobs}) => {
    const searchType = JSON.parse(localStorage.getItem('searchType')) ? JSON.parse(localStorage.getItem('searchType')) : {};
    const [workCategoryList, setWorkCategoryList] = useState(searchType.workCategory ? searchType.workCategory : JobRepository.getWorkCategoryList());
    const onChange = (e) => {
        // 있으면 제거 없으면 추가
        setWorkCategoryList((current) => {
            const newList = [...current];
            newList.map(x => {
                if(x.name === e.target.name){
                    x.clicked = !x.clicked;
                    return x;
                }
            })
            return newList;
        })
    }
    const onReset = () => {
        setWorkCategoryList((current)=>{
            const newList = [...current];
            newList.map(x=>{
                x.clicked = false;
                return x;
            });
            return newList;
        });
    }
    const onSubmit = async () => {
        searchType.workCategory = workCategoryList;
        console.log(searchType);
        localStorage.setItem('searchType', JSON.stringify(searchType));
        await JobRepository.search(searchType)
            .then((data) => {
                console.log(data);
                setJobs(data);
                setOpen(false);
            })
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>하는일</div>
            <ul className={styles.list}>
                {
                    workCategoryList.map(category =>
                        <li key={category.id}>
                            <label htmlFor={category.id}>
                                <input
                                    id={category.id}
                                    type='checkbox'
                                    checked={category.clicked}
                                    value={category.id}
                                    name={category.name}
                                    onChange={onChange} /> {category.name}
                            </label>
                        </li>
                    )
                }
            </ul>
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

export default WorkCategory;