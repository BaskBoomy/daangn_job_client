import React, { useState, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../headerwithbackicon/header';
import InputText from '../inputtext/inputtext';
import styles from './addjob.module.css';
import DetailContent from './detailcontent/detailcontent';
import WorkCategory from './workcategory/workcategory';
import WorkPay from './workpay/workpay';
import WorkPeriod from './workperiod/workperiod';
import WorkPlace from './workplace/workplace';
import WorkTime from './worktime/worktime';
const AddJob = memo(({ user, FileInput, JobRepository, DateService, TimeService, InputValidation, ImageUploader }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSaved = location.state.isSaved;
    const localStore = localStorage.getItem("formInputData");
    const [loading, setLoading] = useState(false);
    const [formInputData, setFormInputData] = useState(isSaved ? JSON.parse(localStore) : JobRepository.jobPostSetting());
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const onFileChange = file => {
        const NewInputValue = { ...formInputData, images: file };
        setFormInputData(NewInputValue);
        localStorage.setItem('formInputData', JSON.stringify(NewInputValue));
    }
    const onDelete = async (id,public_id) => {
        await ImageUploader.delete(public_id);
        setFormInputData((current) => {
            const newValue = { ...current.images };
            delete newValue[id];
            return { ...current, images: newValue };
        });
    }
    const onChange = (e) => {
        const inputFieldValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const inputFieldName = e.target.name;
        const NewInputValue = { ...formInputData, [inputFieldName]: inputFieldValue };
        isSubmit && setFormErrors(InputValidation.addJob(NewInputValue));
        setFormInputData(NewInputValue);

        localStorage.setItem('formInputData', JSON.stringify(NewInputValue));
    }
    const onSubmit = async (e) => {
        // setLoading(true);
        e.preventDefault();
        setIsSubmit(true);
        setFormErrors(InputValidation.addJob(formInputData));
        let dateResult;
        const clicked = formInputData.days.filter(x => x.clicked);
        if (formInputData.term === 'short') {
            let firstDate = formInputData.dates[0];
            let lastDate = formInputData.dates.at(-1);

            if (firstDate.isToday) {
                firstDate = '오늘'
            } else {
                firstDate = `${firstDate.month}월 ${firstDate.date}일`;
            }
            lastDate = `${lastDate.month}월 ${lastDate.date}일`;
            dateResult = `총 ${formInputData.dates.length}일 / ${firstDate} ~ ${lastDate} 중`;
        } else {
            dateResult = '';

            //요일 이어져 있는지 확인
            let isAlong = true;
            for (var i = 0; i < clicked.length - 1; i++) {
                if (clicked[i].id + 1 !== clicked[i + 1].id) {
                    isAlong = false;
                }
            }

            Object.keys(clicked).map(key => {
                dateResult += `${clicked[key].day},`;
            })
            dateResult = dateResult.slice(0, -1);

            if (isAlong) {
                dateResult = `${clicked[0].day}~${clicked.at(-1).day}`;
            }
        }

        let timeResult = '';
        if (formInputData.negotiable) {
            timeResult = ' 협의';
        }
        const jobPost = {
            title: formInputData.title,
            place: formInputData.place,
            updatedFromUser: 0,
            salary: formInputData.payType,
            pay: formInputData.pay,
            date: dateResult,
            dateSearch : clicked.map(x=>x.day),
            time: `${formInputData.startTime} ~ ${formInputData.endTime}${timeResult}`,
            startTime : parseInt(formInputData.startTime.split(':')[0]),
            endTime:parseInt(formInputData.endTime.split(':')[0]),
            images: formInputData.images,
            detailcontent : formInputData.detailcontent,
            workCategory:formInputData.workCategory.map((data)=>data.name),
            jobOfferer : user,
            isShortJob : formInputData.term === 'short' ? true : false,
        }
        navigate('/job-post-preview',{state:{jobPost}});
        
        setLoading(false);

        // navigate('/job-post-preview');
    }
    const backHandler = () => {
        navigate('/');
    }

    return (
        <>
            {!loading && (
                <>
                    <Header title='구인 글쓰기' backHandler={backHandler} iconWithX={true} btnTitle={'불러오기'} btnLink={'/'} />
                    <div className={styles.container}>
                        <FileInput
                            image={formInputData.images}
                            onFileChange={onFileChange}
                            onDelete={onDelete}
                            maxImage={10}
                            subTitle={'일하는 공간이나 일과 관련된 사진을 올려보세요.'} />
                        <InputText
                            title={'제목'}
                            placeholder={'구인 내용 요약'}
                            name={'title'}
                            value={formInputData.title}
                            onChange={onChange}
                            error={formErrors.title} />
                        <WorkCategory
                            JobRepository={JobRepository}
                            onChange={onChange}
                            value={formInputData.workCategory} />
                        <WorkPay
                            value={formInputData}
                            onChange={onChange}
                            error={formErrors.pay} />
                        <WorkPeriod
                            value={formInputData}
                            onChange={onChange}
                            DateService={DateService}
                            JobRepository={JobRepository}
                            error={{ dates: formErrors.dates, days: formErrors.days }} />
                        <WorkTime
                            value={formInputData}
                            onChange={onChange}
                            TimeService={TimeService}
                        />
                        <DetailContent
                            value={formInputData.detailcontent}
                            onChange={onChange}
                            error={formErrors.detailcontent} />
                        <hr className={styles.splitLine} />
                        <WorkPlace
                            value={formInputData}
                            onChange={onChange}
                            isSaved={isSaved}
                            error={
                                {
                                    businessName: formErrors.businessName,
                                    address: formErrors.address,
                                    number: formErrors.number,
                                    isTermsOfComplianceChecked: formErrors.isTermsOfComplianceChecked
                                }
                            } />
                        <div className={styles.bottomFix}>
                            <button onClick={onSubmit}>작성 완료</button>
                        </div>
                    </div>
                </>
            )}
            {loading && <div className={styles.loading}></div>}
        </>
    );
});

export default AddJob;