import React,{useState,useEffect} from 'react';
import styles from './workcategory.module.css';
const WorkCategory = ({JobRepository,onChange,value}) => {
    const limitCount = process.env.REACT_APP_WORKCATEGORY_LIMIT_COUNT;
    const [workCategory, setWorkCategory] = useState(JobRepository.getWorkCategoryList());
    const [showMoreCategory, setShowMoreCategory] = useState(false);
    const showMoreBtnHandler = () => {
        setShowMoreCategory(!showMoreCategory);
    }
    const updateWorkCategoryState = (key) => {
        setWorkCategory(current => {
            const newData = {...current};
            //선택 해제
            if(newData[key].clicked){
                newData[key].clicked = false;
                return newData;
            }
            //제한 개수 이상 선택 시 알림
            if(Object.values(workCategory).filter(x=>x.clicked === true).length>=limitCount){
                alert(`최대 ${limitCount}개까지 선택가능합니다!`);
                return newData;
            }
            //선택
            if(!newData[key].clicked){
                newData[key].clicked = true;
                return newData;
            }
        })
    }
    const categoryClickHandler = (key) => {
        updateWorkCategoryState(key);
    }
    useEffect(()=>{
        const data = JobRepository.getWorkCategoryList();
        for(var i =0;i<data.length;i++){
            for(var j=0;j<value.length;j++){
                if(data[i].id===value[j].id){
                    data[i].clicked = true;
                }
            }
        }
        setWorkCategory(data);
    },[JobRepository,value,setWorkCategory])
    useEffect(()=>{
        onChange({
            target:{
                name:'workCategory',
                value:Object.keys(workCategory).map(key=>{
                    return workCategory[key];
                }).filter(x=>x.clicked === true)
            }
        })
    },[workCategory])
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                하는일 <span>(최대 {limitCount}개)</span>
            </div>
            <div className={styles.workCategoryContainer}>
                {
                    Object.keys(workCategory).map(key=>{
                        if(!showMoreCategory && key > 5){
                            return false;
                        }
                        return (
                            <div
                                key={workCategory[key].id}
                                className={workCategory[key].clicked ? `${styles.isActive}` : `${styles.workCategoryBox}` }
                                onClick={()=>categoryClickHandler(key)}>
                                {workCategory[key].name}
                            </div>
                        )
                    })
                }
                <div
                    className={`${styles.workCategoryBox} ${styles.colorBlue}`}
                    onClick={showMoreBtnHandler}>
                    {!showMoreCategory ? '더보기' : '접기'}
                </div>
            </div>
            
        </div>
    );
}

export default WorkCategory;