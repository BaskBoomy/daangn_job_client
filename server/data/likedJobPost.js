import { getLike } from "../database/database.js";
import MongoDB from 'mongodb';

const ObjectId = MongoDB.ObjectId;
/*
1. 유저가 해당 post를 좋아요 누른 기록이 없을 경우
- 새로운 document 생성
2. 유저가 해당 post를 좋아요 누른 기록이 있을 경우
- 해당 document의 isLike를 반대로 설정
*/
export async function getIsLike(jobPostId, userId){
    return getLike()
    .findOne({jobPostId,userId: new ObjectId(userId)})
    .then((data)=>{
        if(data){
            return data.isLike;
        }else{
            return false;
        }
    });
}
export async function updateJobPostLike(jobPost,userId){
    return getLike().findOneAndUpdate(
        {jobPostId:jobPost.jobPostId,userId},
        {$set:jobPost},
        {upsert:true}
    )
    .then((data)=>{
        if(data.lastErrorObject.updatedExisting){
            return data.value.isLike;
        }else{
            return true;
        }
    });
}

export async function getLikedList(userId){
    return getLike().find(
        {userId,
        isLike:true}
    )
    .toArray()
    .then(mapOptionalLike);
}


function mapOptionalLike(data){
    const newData = Object.keys(data).map(key=>{
        data[key]._id = data[key].jobPostId;
        return data[key];
    })
    return newData;
}