import {config} from '../config.js';
import MongoDB from 'mongodb';

let db;
export async function connectDB(){
    return MongoDB.MongoClient.connect(config.db.host)
    .then((client) =>{
        db =  client.db('carrot-job');
    });
}

export function getUsers(){
    return db.collection('users');
}
export function getLocations(){
    return db.collection('location');
}
export function getJobs(){
    return db.collection('jobs');
}
export function getLike(){
    return db.collection('like');
}