import React from 'react';
import AddressPicker from '../../addresspicker/addresspicker';
import InputText from '../../inputtext/inputtext';
import PhoneNumber from '../phonenumber/phonenumber';
import TermsOfCompliance from '../termsofcompliance/termsofcompliance';
import styles from './workplace.module.css';

const WorkPlace = ({value,onChange,error,isSaved}) => {
    const btnSwitchHandler = (input) => {
        input !== value.isMarket && onChange({
            target:{
                name:'isMarket',
                value:!value.isMarket
            }
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>일할 장소에 대해 알려주세요</div>
            <ul className={styles.btns}>
                <li className={value.isMarket ? `${styles.btnIsActive}` : `${styles.btn}`} onClick={()=>btnSwitchHandler(true)}>가게 운영중</li>
                <li className={value.isMarket ? `${styles.btn}` :`${styles.btnIsActive}`}  onClick={()=>btnSwitchHandler(false)}>가게가 아니에요</li>
            </ul>
            {
                value.isMarket &&
                <>
                    <InputText
                        title={'사업자등록번호'}
                        placeholder={'사업자등록번호를 입력해주세요.'}
                        onChange={onChange}
                        name={'corporateNumber'}
                        value={value.corporateNumber}
                        isChoosable={true}/>
                    <InputText
                        title={'상호명'}
                        placeholder={'예) 당근가게'}
                        onChange={onChange}
                        name={'businessName'}
                        value={value.businessName}
                        error={error.businessName}/>
                </>
            }
            <AddressPicker
                value={value.place.address}
                onChange={onChange}
                error={error.place}
                isSaved={isSaved}/>
            <PhoneNumber
                value={value}
                onChange={onChange}
                error={error.number}/>
            <TermsOfCompliance
                value={value.isTermsOfComplianceChecked}
                onChange={onChange}
                error={error.isTermsOfComplianceChecked}/>

        </div>
    );
}

export default WorkPlace;