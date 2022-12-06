class InputValidation{

    generalInfo(values){
        let errors = {};
        if(!values.phoneNumber){
            errors.phoneNumber = '연락처를 입력해주세요.';
        }
        if(!values.gender){
            errors.gender = '성별을 선택해주세요.';
        }
        if(!values.borndate){
            errors.borndate = '태어난 연도를 숫자 4자리로 입력해주세요.';
        }
        
        if(values.selfIntroduction && values.selfIntroduction.length > 2000){
            errors.selfIntroduction = '글자는 2000자 이하여야 합니다.';
        }
        return errors;
    }

    career(values){
        let errors = {};
        if(!values.place){
            errors.place = '일한 곳의 상호명을 입력해주세요.';
        }

        if(!values.startedDate || (!values.isWorking && !values.endedDate)){
            errors.date = '종료일과 시작일을 선택해주세요.'
        }

        if(values.startedDate){
            const started = values.startedDate.split('-');
            const ended = values.endedDate.split('-');
            if (values.endedDate && parseInt(started[0]) > parseInt(ended[0])) {
                errors.date = '시작 연도는 종료 연도 이전으로 선택해주세요.'
            }
    
            if (values.endedDate && parseInt(started[0]) <= parseInt(ended[0]) && parseInt(started[1]) > parseInt(ended[1])) {
                errors.date = '시작 월은 종료 월 이전으로 선택해주세요. '
            }
        }
        return errors;
    }

    addJob(values){
        let errors = {};
        if(!values.title){
            errors.title = '구인글의 제목을 입력해주세요.';
        }
        if(values.title && values.title.length < 6){
            errors.title = '최소 6자에서 최대 50자까지 입력할 수 있어요.';
        }
        if(!values.pay){
            errors.pay = '숫자만 입력해주세요.';
        }
        if(values.pay && values.pay < process.env.REACT_APP_KOREA_MINIMUM_WAGE){
            errors.pay = '최저임금을 준수해주세요. 2022년 최저시급은 9,160원입니다.'
        }

        if(values.term === 'short' && values.dates.length <= 0 ){
            errors.dates = '날짜를 하나 이상 선택해주세요.'
        }
        if(values.term === 'long' && values.days.filter(x=>x.clicked === true).length <= 0){
            errors.days = '요일을 하나 이상 선택해주세요.'
        }
        if(!values.detailcontent){
            errors.detailcontent = '상세 내용을 입력해주세요.'
        }
        if(!values.businessName){
            errors.businessName = '상호명을 입력해주세요.'
        }
        if(!values.place.address){
            errors.address = '주소를 선택해주세요.'
        }
        if(!values.number){
            errors.number = '연락처를 입력해주세요.'
        }
        if(!values.isTermsOfComplianceChecked){
            errors.isTermsOfComplianceChecked = '준수사항을 모두 확인해주세요.'
        }
        return errors;
    }
}

export default InputValidation;