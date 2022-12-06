import React, { memo,useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../headerwithbackicon/header';
import ImageSlider from '../../imageslider/imageslider';
import styles from './jobpost.module.css';
import { ReactComponent as Calendar } from '../../../assets/calendar.svg';
import { ReactComponent as Clock } from '../../../assets/clock.svg';
import { ReactComponent as Won } from '../../../assets/won.svg';
import { ReactComponent as Message } from '../../../assets/message.svg';
import { ReactComponent as HeartFilled } from '../../../assets/heart-filled.svg';
import { ReactComponent as HeartOutLined } from '../../../assets/heart-outlined.svg';

import KakaoMap from '../../kakaomap/kakaomap';

const JobPost = memo(({ JobRepository,AuthService }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const postId = location.state.postId;
    const [jobPost, setJobPost] = useState(undefined);
    const [isLike, setIsLike] = useState(undefined);

    //jobpost id로 post 불러오기
    useEffect(() => {
        JobRepository
            .getJobById(postId)
            .then((data) => {
                setJobPost(data);
            });
        AuthService
            .getCurrentJobPostLikeStatus(postId)
            .then((data)=>{
                setIsLike(()=>data);
            })
    }, [])

    const backHandler = () => {
        navigate('/');
    }

    const likePost = () => {
        AuthService
            .updateJobPostLike({...jobPost,isLike:!isLike})
            .then((data)=>{
                //반대로 바꾸기
                setIsLike((current)=>!current);
            })
    };

    const LikeButton = memo(()=>(
        <button className={styles.heart} onClick={likePost}>
            {
                isLike ? 
                <HeartFilled width='20' height='20' fill='#ed7733' />
                :
                <HeartOutLined width='20' height='20' fill='#ed7733' />
            }
        </button>
    ),[isLike]);
    
    const call = () => {
        alert('전화하기');
    }
    const onSubmit = () => {
    }
    return (
        <div className={styles.jobPostContainer}>
            <Header backHandler={backHandler} iconWithX={true} />
            {
                jobPost &&
                (
                    <div className={styles.container}>
                        <ImageSlider images={Object.values(jobPost.images).map(data => {
                            return data.fileURL;
                        })} />
                        <div className={styles.jobTitle}>
                            <div className={styles.categoryBox}>
                                {
                                    Object.values(jobPost.workCategory).map((data, idx) => {
                                        return (
                                            <div key={idx} className={styles.grayBox}>
                                                {data}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <span>{jobPost.title}</span>
                        </div>
                        <div className={styles.jobBody}>
                            <div className={styles.jobinfo}>
                                <Won className={styles.icon} />
                                <span className={styles.textbold}>{jobPost.salary} {jobPost.pay}원</span>
                            </div>
                            <div className={styles.jobinfo}>
                                <Calendar className={styles.icon} />
                                <span>{jobPost.date}</span>
                            </div>
                            <div className={styles.jobinfo}>
                                <Clock className={styles.icon} />
                                <span>{jobPost.time}</span>
                            </div>
                            <div className={styles.detailcontent}>{jobPost.detailcontent}</div>
                            <div className={styles.grayText}>
                                지원자 {0} - 조회 {0}
                            </div>
                            <KakaoMap x={jobPost.place.x} y={jobPost.place.y} />
                            <div className={styles.place}>{jobPost.place.address}({jobPost.place.dong})</div>
                        </div>
                        <hr className={styles.hr} />
                        <div className={styles.employerBox}>
                            <div className={styles.title}>
                                {jobPost.jobOfferer.nickname}님이 구인 중이에요
                            </div>
                            <div className={styles.infoBox}>
                                <div className={styles.imageBox}>
                                    <img className={styles.profilImage} alt='profile' src={jobPost.jobOfferer.image.fileURL} />
                                </div>
                                <div className={styles.textInfo}>
                                    <div className={styles.title}>{jobPost.jobOfferer.nickname}</div>
                                    <div className={styles.smallText}>반포2동 인증 11회</div>
                                </div>
                                <div className={styles.mannerInfo}>
                                    <div className={styles.top}>
                                        <div className={styles.topLeft}>37.2℃ &#128522;</div>
                                        <div className={styles.topRight}></div>
                                    </div>
                                    <div className={styles.bottom}>
                                        매너온도
                                    </div>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.childBox}>
                                    <Message className={styles.icon} />
                                    알바 응답률 -%
                                    <span className={styles.tinyText}>아직 응답이 충분히 모이지 않았어요</span>
                                </div>
                                <div className={styles.childBox}>
                                    <Calendar className={styles.icon} />
                                    <span>당근알바 2022년 8월부터 이용중</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


            <div className={styles.footer}>
                <LikeButton/>
                <button className={styles.btnLightOrange} onClick={call}>전화문의</button>
                <button className={styles.btnOrange} onClick={onSubmit}>지원하기</button>
            </div>
        </div>
    );
});

export default JobPost;