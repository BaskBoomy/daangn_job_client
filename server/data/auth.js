import { getUsers } from "../database/database.js";
import MongoDB from 'mongodb';

const ObjectId = MongoDB.ObjectId;

export async function findByPhoneNumber(phoneNumber){
    return getUsers()
    .findOne({phoneNumber})
    .then(mapOptionalUser);
}

export async function createUser(user){
    return getUsers()
    .insertOne(user)
    .then(data=>{
        console.log(data);
        return data.insertedId.toString();
    })
}

export async function findById(id){
    return getUsers()
    .findOne({_id:new ObjectId(id)})
    .then(mapOptionalUser);
}

export async function update(id,updateData){
    return getUsers()
        .findOneAndUpdate(
            {_id: new ObjectId(id)},
            {$set:updateData},
            {returnDocument: 'after'}
        )
        .then(data =>{
            console.log(mapOptionalUser(data.value));
            return mapOptionalUser(data.value);
        });
}

export async function setProfile(id, image, nickname){
    //사용자 프로필 사진, 닉네임 받아와서 정보 업데이트하기
    return getUsers()
    .findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set:{image,nickname}},
        {returnDocument: 'after'} //수정이된 다음의 객체를 return
    )
    .then(data =>{
        console.log(mapOptionalUser(data.value));
        return mapOptionalUser(data.value);
    });
}

function mapOptionalUser(data){
    return data ? {...data, id: data._id} : data;
}