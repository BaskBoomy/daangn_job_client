import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from './searchcategory.module.css';
import BottomSheet from "../bottomsheet/bottomsheetbody";
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as Calendar } from '../../assets/calendar-check-black.svg';
import { ReactComponent as CheckedCalendar } from '../../assets/calendar-check-white.svg';
const SearchCategory = ({ JobRepository, setJobs }) => {
    const [nearAddress, setNearAddress] = useState([]);
    const searchType = JSON.parse(localStorage.getItem('searchType')) ? JSON.parse(localStorage.getItem('searchType')) : {};
    const isActive = {
        place : searchType.place && searchType.place.length !== Object.keys(nearAddress).length,
        workCategory : searchType.workCategory && searchType.workCategory.filter(x => x.clicked === true).length > 0,
        dates : searchType.dates && searchType.dates.filter(x => x.clicked === true).length > 0,
        time : searchType.time && (searchType.time.startTime !== 0 || searchType.time.endTime !== 24) ? true : false
    };
    const result = {
        place : searchType.place ? searchType.place.length : Object.keys(nearAddress).length,
        workCategory : searchType.workCategory ? searchType.workCategory.filter(x=>x.clicked===true).length : 0,
        dates : searchType.dates ? searchType.dates.map(x=>{
            if(x.clicked){
                return `${x.day},`
            }
        }): '',
        time :searchType.time ? `${searchType.time.startTime}시~${searchType.time.endTime}시` : ''
    };
    const [open, setOpen] = useState(false);
    const [categoryNo, setCategoryNo] = useState(0);
    const [range, setRange] = useState();
    const [isShortJob, setIsShortJob] = useState(searchType.isShortJob ? searchType.isShortJob : false);
    const { user, getNearAddress } = useAuth();


    useEffect(() => {
        getNearAddress(user.myplace.currentX, user.myplace.currentY)
            .then((data) => {
                setNearAddress(data.address);
                setRange(data.range);
            })

        // 내 동네 몇개인지 받아오기 내 주변동네 정보 받아오기
        // 받아와서 /nearAddress에 넘겨주기
    }, [getNearAddress]);
    const getPartAddress = (idx) => {
        //모든 주소범위를 얻기 위한 배열
        const accumulatedAddress = [
            nearAddress.slice(0, range[0].value),
            nearAddress.slice(0, range[1].value),
            nearAddress.slice(0, range[2].value),
            nearAddress.slice(0, range[3].value),
        ];
        //거리순으로 주소를 분류해놓은 배열
        const slicedAddress = [
            nearAddress.slice(0, range[0].value),
            nearAddress.slice(range[0].value, range[1].value),
            nearAddress.slice(range[1].value, range[2].value),
            nearAddress.slice(range[2].value, range[3].value),
        ];
        return idx >= 0 ? accumulatedAddress[idx] : slicedAddress;
    }
    const getSliderValue = (size, isIndex) => {
        let value;
        if (size <= range[0].value) value = range[0];
        else if (size <= range[1].value) value = range[1];
        else if (size <= range[2].value) value = range[2];
        else value = range[3];

        return isIndex ? value.idx : value.value;
    }
    const setShortJob = async () => {
        const searchType = JSON.parse(localStorage.getItem('searchType')) ? JSON.parse(localStorage.getItem('searchType')) : {};
        if (searchType.isShortJob) {
            /*조건을 장기로 설정할 경우 undefined으로 값을 지정한 이유 : 
            현재 당근에서는 단기 또는 단기를 포함한 단기,장기 알바들을 검색 결과로 출력하고 있기 때문에 
            ATLAS 검색 조건을 설정할 때 value 값을 true이거나 아에 단기에 해당하는 검색조건을 
            주지 않기 위해 undefined로 설정함 */
            searchType.isShortJob = undefined;
        } else {
            searchType.isShortJob = true;
        }
        localStorage.setItem('searchType', JSON.stringify(searchType));
        setIsShortJob((current) => !current);
        await JobRepository.search(searchType)
            .then((data) => {
                console.log(data);
                setJobs(data);
            })
    }
    return (
        <div className={styles.categories}>
            <span
                className={isActive.place ? `${styles.checked} ${styles.category}`:styles.category }
                onClick={() => { setOpen(!open); setCategoryNo(0) }}>
                {`${user.myplace.address.split(' ')[2]}외 ${result.place}`} {isActive.place ? <ArrowDown fill="#555"/> : <ArrowDown fill="white"/>}
            </span>
            <span className={isShortJob ? `${styles.checked} ${styles.category}`:styles.category} onClick={setShortJob}>
                <span className={styles.icon}>{isShortJob ? <Calendar fill="white"/> : <Calendar />}</span>
                단기
            </span>
            <span
                className={isActive.workCategory ? `${styles.checked} ${styles.category}`:styles.category}
                onClick={() => { setOpen(!open); setCategoryNo(7) }}>
                하는일
                {
                    isActive.workCategory ? <> {result.workCategory}<ArrowDown fill="#FFF"/></> : <> <ArrowDown fill="#555"/></>
                }
            </span>
            <span
                className={isActive.dates ? `${styles.checked} ${styles.category}`:styles.category}
                onClick={() => { setOpen(!open); setCategoryNo(1) }}>
                {
                    isActive.dates ? <>{result.dates} <ArrowDown fill="white"/></> : <>요일 <ArrowDown fill="#555"/></>
                }
            </span>
            <span 
                className={isActive.time ? `${styles.checked} ${styles.category}`:styles.category} 
                onClick={() => { setOpen(!open); setCategoryNo(2) }}>
                {
                    isActive.time ? <>{result.time} <ArrowDown fill="white"/></> : <>시간 <ArrowDown fill="#555"/> </>
                }
            </span>

            <BottomSheet
                categoryNo={categoryNo}
                open={open}
                setOpen={setOpen}
                nearAddress={nearAddress}
                getPartAddress={getPartAddress}
                getSliderValue={getSliderValue}
                range={range}
                JobRepository={JobRepository}
                setJobs={setJobs}></BottomSheet>
        </div>
    )
}

export default SearchCategory;