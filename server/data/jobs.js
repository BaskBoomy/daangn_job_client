import { getJobs } from "../database/database.js";
import MongoDB from 'mongodb';

const ObjectId = MongoDB.ObjectId;

export async function createJob(job) {
    return getJobs()
        .insertOne(job)
        .then(data => mapOptionalJob({ ...job, _id: data.insertedId }));
}

export async function getJobslist() {
    return await getJobs()
        .find()
        .toArray()
        .then(mapOptionalJob);
}

export async function getJobById(id) {
    return getJobs()
        .findOne({ _id: new ObjectId(id) })
        .then(mapOptionalJob);
}

const types = ['isShortJob', 'place', 'workCategory', 'dates', 'time', 'text'];

export function getSearchSetting(searchType) {
    let setting = [];
    types.map(data => {
        if (data === 'time' && 'time' in searchType) {
            const query = getQuery(data.toString(), searchType[data.toString()]);
            setting.push(query[0], query[1]);
        } else {
            data.toString() in searchType && setting.push(getQuery(data.toString(), searchType[data.toString()]));
        }
    })
    return setting;
}

function getQuery(type, data) {
    switch (type) {
        case 'isShortJob':
            return {
                "equals": {
                    "path": "isShortJob",
                    "value": data,
                }
            };
        case 'place':
            return {
                "text": {
                    "query": data,
                    "path": ["place.dong", "place.hname"]
                }
            };
        case 'workCategory':
            return {
                "text": {
                    "query": data,
                    "path": "workCategory"
                }
            };
        case 'dates':
            return {
                "text": {
                    "query": data,
                    "path": "dateSearch"
                }
            };
        case 'time':
            return [
                {
                    "range": {
                        "path": "startTime",
                        "gte": data.startTime
                    }
                },
                {
                    "range": {
                        "path": "endTime",
                        "lte": data.endTime
                    }
                }
            ];
        case 'text':
            return {
                "text": {
                    "query": data,
                    "path": {
                        "wildcard": "*"
                    }
                }
            }
    }
}
function mapOptionalJob(data) {
    return data ? { ...data, id: data._id } : data;
}