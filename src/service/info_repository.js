import {ReactComponent as Camera} from '../assets/camera-color.svg';
import {ReactComponent as Database} from '../assets/database.svg';
import {ReactComponent as Paper} from '../assets/paper.svg';
import {ReactComponent as Star} from '../assets/star.svg';
const users = {
    '1':{
        id: '1',
        name: '최종혁',
        images:{},
        number: '01097735873',
        gender: '남성',
        borndate: '1997',
        careers: {},
        selfIntroduction: '',
        jobAlarm: false,
        appliedList:[
            {
                id:1,
                title:'내가 지원한 알바1',
                place:'알바당 반포동',
                updatedFromUser:'11',
                salary:'일급',
                pay:'10,000',
                date:'월~금 협의',
                time:'08:30~17:30 협의',
                img:'https://i.pravatar.cc/150'
            },
            {
                id:2,
                title:'내가 지원한 알바2',
                place:'알바당 반포동',
                updatedFromUser:'11',
                salary:'일급',
                pay:'10,000',
                date:'월~금 협의',
                time:'08:30~17:30 협의',
                img:'https://i.pravatar.cc/150'
            }
        ],
        likedList:[
            {
                id:1,
                title:'관심 목록 1',
                place:'알바당 반포동',
                updatedFromUser:'11',
                salary:'일급',
                pay:'10,000',
                date:'월~금 협의',
                time:'08:30~17:30 협의',
                img:'https://i.pravatar.cc/150'
            },
            {
                id:2,
                title:'관심 목록 2',
                place:'알바당 반포동',
                updatedFromUser:'11',
                salary:'일급',
                pay:'10,000',
                date:'월~금 협의',
                time:'08:30~17:30 협의',
                img:'https://i.pravatar.cc/150'
            }
        ],
        jobPosts:[],
    }
};
const infoBtns = [
    {
        id:1,
        Icon:()=><Camera width={'1.5rem'} height={'1.5rem'}/>,
        shortTitle:'기본 정보',
        title:'기본 정보 등록하기',
        subTitle:'나에 대해 알려주세요. 신뢰를 쌓는 첫번재 방법이에요.',
        btnTitle:'기본 정보 등록',
        btnTitleWritten:'기본 정보 수정',
        isWritten:false,
    },
    {
        id:2,
        Icon:()=><Database width={'1.5rem'} height={'1.5rem'}/>,
        shortTitle:'사진 등록',
        title:'사진 등록하기',
        subTitle:'프로필 사진이 있는 지원자는 눈에 더 띌 수 있어요.',
        btnTitle:'사진 등록',
        btnTitleWritten:'사진 수정',
        isWritten:false
    },
    {
        id:3,
        Icon:()=><Paper width={'1.5rem'} height={'1.5rem'}/>,
        shortTitle:'자기소개',
        title:'자기소개하기',
        subTitle:'나의 성격의 장점, 특징 등을 알려주세요.',
        btnTitle:'자기소개 등록',
        btnTitleWritten:'자기소개 수정',
        isWritten:false
    },
    {
        id:4,
        Icon:()=><Star width={'1.5rem'} height={'1.5rem'}/>,
        shortTitle:'경력/경험',
        title:'경력/경험 등록하기',
        subTitle:'그동안 쌓아온 소중한 경력/경험들을 여기에 적어주세요.',
        btnTitle:'경력/경험 등록',
        btnTitleWritten:'경력/경험 수정',
        isWritten:false
    },
];
class InfoRepository {
    getUsers(){
        return users;
    }
    getMyProfilInfo(id){
        return users[id];
    }
    getInfoBtns(){
        return infoBtns;
    }
    updateMyProfileInfo(id, info){
        users[id] = info;
        console.log(`${id}'s info updated!!`);
        console.log(users[id]);
    }
    getCareerById(userId, careerId){
        return users[userId].careers[careerId];
    }
    createOrUpdateCareer(id, career){
        users[id].careers[career.id] = career;
    }
    deleteCareer(id, careerId){
        delete users[id].careers[careerId];
    }
    //사용
    updateInfoStatus(user){
        console.log(user);
        const {name,image,phoneNumber,gender,borndate,careers,selfIntroduction} = user;

        if(name && phoneNumber && gender && borndate){
            infoBtns.find(x=>x.id === 1).isWritten = true;
        }

        if(image){
            infoBtns.find(x=>x.id === 2).isWritten = true;
        }

        if(selfIntroduction){
            infoBtns.find(x=>x.id === 3).isWritten = true;
        }

        if(careers && Object.keys(careers).length > 0){
            infoBtns.find(x=>x.id === 4).isWritten = true;
        }
    }
    getAppliedList(id){
        return users[id].appliedList;
    }
    getLikedList(id){
        return users[id].likedList;
    }
    getJobAlarm(id){
        return users[id].jobAlarm;
    }
    setJobAlarm(id){
        users[id].jobAlarm = !users[id].jobAlarm;
    }
}

export default InfoRepository;