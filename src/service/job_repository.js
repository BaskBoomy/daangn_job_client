
const days = [
    { id: 0, day: '월', clicked: false },
    { id: 1, day: '화', clicked: false },
    { id: 2, day: '수', clicked: false },
    { id: 3, day: '목', clicked: false },
    { id: 4, day: '금', clicked: false },
    { id: 5, day: '토', clicked: false },
    { id: 6, day: '일', clicked: false },
]
const jobPost = {
    images: [],
    title: '',
    workCategory: [],
    pay: 0,
    payType: '시급',
    term: 'short',//short(단기),long(한달 이상)
    dates: [], //단기일경우
    days: days, //장기일 경우
    startTime: '00:00',
    endTime: '00:00',
    negotiable: false,
    detailcontent: '',
    isMarket: true, //가게 운영 여부
    corporateNumber: '',
    businessName: '',
    place: {},
    number: '',
    uncallable: false,
    isTermsOfComplianceChecked: false, //준수사항동의여부
    isSubmitted: false, //제출여부
}

const workCategory = [
    { id: 1, name: '서빙', clicked: false },
    { id: 2, name: '주방보조/설거지', clicked: false },
    { id: 3, name: '주방장/조리사', clicked: false },
    { id: 4, name: '매장관리/판매', clicked: false },
    { id: 5, name: '음료 제조', clicked: false },
    { id: 6, name: '베이킹', clicked: false },
    { id: 7, name: '편의점', clicked: false },
    { id: 8, name: '과외/학원', clicked: false },
    { id: 9, name: '전단지 배포', clicked: false },
    { id: 10, name: '청소/미화', clicked: false },
    { id: 11, name: '가사/집정리', clicked: false },
    { id: 12, name: '돌봄/시팅', clicked: false },
    { id: 13, name: '등하원도우미', clicked: false },
    { id: 14, name: '심부름/소일거리', clicked: false },
    { id: 15, name: '기타', clicked: false },
]

class JobRepository {
    constructor(http) {
        this.http = http;
    }
    async getJobs() {
        return this.http.fetch('/jobs', {
            method: 'GET',
        });
    }

    async getJobById(id){
        return this.http.fetch(`/jobs/${id}`, {
            method: 'GET',
        });
    }
    async createJob(job){
        return this.http.fetch('/jobs/createJob', {
            method: 'POST',
            body: JSON.stringify({job})
        });
    }

    // async searchAll(text){
    //     return this.http.fetch(`/jobs/searchAll?text=${text}`,{
    //         method:'GET',
    //     })
    // }
    async search(searchType){
        if(searchType.workCategory && searchType.workCategory.filter(x=>x.clicked === true).length > 0){
            searchType.workCategory = searchType.workCategory.filter(x=>x.clicked === true).map(x=>x.name);
        }else{
            delete searchType.workCategory;
        }
        if(searchType.dates && searchType.dates.filter(x=>x.clicked === true).length > 0){
            searchType.dates = searchType.dates.filter(x=>x.clicked === true).map(x=>x.day);
        }else{
            delete searchType.dates;
        }
        
        return this.http.fetch('/jobs/search', {
            method: 'POST',
            body: JSON.stringify({searchType})
        });
    }
    jobPostSetting(){
        return jobPost;
    }
    getWorkCategoryList() {
        return workCategory;
    }
    getDays() {
        return days;
    }
    setJobPost(id, post) {
        this.users[id].jobPosts.push(post);
        // console.log(this.users[id].jobPosts);
    }
    async setAddress(place) {
        jobPost.place = place;
        const jobPostData = JSON.parse(localStorage.getItem('formInputData'));
        localStorage.setItem('formInputData', JSON.stringify({ ...jobPostData, place: place }));
    }
}

export default JobRepository;