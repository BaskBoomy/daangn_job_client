import React from 'react';
import { useState, useEffect } from 'react';
import styles from './choose_location.module.css';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { useNavigate } from 'react-router-dom';
const ChooseLocation = ({ locationService }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [result, setResult] = useState(undefined);
    const [searchText, setSearchText] = useState('');
    const onChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
    }

    const currentLocationHandler = () => {
        locationService
            .getNearLocation()
            .then(data => {
                setResult([...data]);
            })
            .catch(onError);
    }

    useEffect(() => {
        locationService
            .search(searchText)
            .then((data) => {
                if (data.length > 0) setResult([...data]);
                else setResult(undefined);
            })
            .catch(onError);
    }, [locationService, searchText]);

    const onError = (error) => {
        setError(error.toString());
        setTimeout(() => {
            setError('');
        }, 3000);
    };

    const saveUserData = (key, value) => {
        console.log(value);
        localStorage.setItem('userData',JSON.stringify({[key]:value}));
        navigate('/varify-phonenumber',{state : {isLogIn : false}});
    }
    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <SearchIcon width='15px' />
                <input
                    type="text"
                    placeholder='내 동네 이름(동,읍,면)으로 검색'
                    className={styles.searchInputBox}
                    onChange={onChange} />
            </div>
            <button className='btnOrange' onClick={currentLocationHandler}>현재 위치로 찾기</button>
            {
                result ?
                    (
                        <div >
                            {searchText !== '' && <div className={styles.textBold}>{`'${searchText}' 검색결과`}</div>}
                            {
                                Object.keys(result).map(key => {
                                    return (
                                        <div
                                            key={key}
                                            className={styles.resultBox}
                                            onClick={() => { saveUserData('myplace', result[key]) }}>
                                            {result[key].address}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                    :
                    (
                        <div className={styles.searchDefault}>
                            <div>현재 위치로 동네를 받아오지 못했어요.</div>
                            <div>내 동네 이름으로 검색해보세요!</div>
                            <div className={styles.textOrange}>내 동네 이름 검색하기</div>
                        </div>
                    )
            }
        </div>
    );
}

export default ChooseLocation;