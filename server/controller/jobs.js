import * as jobRepository from '../data/jobs.js';
import { getJobs } from "../database/database.js";
export async function createJob(req, res) {
    const job = req.body.job;
    try {
        const jobId = await jobRepository.createJob(job);
        res.status(201).json(jobId);
    } catch (e) {
        console.log(e)
    }
}

export async function getJobslist(req, res) {
    const jobs = await jobRepository.getJobslist();
    res.status(200).json(jobs);
}

export async function getJobById(req, res) {
    const id = req.params.id;
    const job = await jobRepository.getJobById(id);

    if (job) {
        res.status(200).json(job);
    } else {
        res.status(404).json({ message: `job Id:${id} not found` });
    }
}

export async function search(req, res) {
    const searchType = req.body.searchType;
    console.log(searchType);
    
    //조건이 존재하지 않을 경우
    if(Object.keys(searchType).length <= 0){
        const jobs = await jobRepository.getJobslist();
        return res.status(200).json(jobs);
    }

    //Atlas Query
    const query = jobRepository.getSearchSetting(searchType);
    console.log(query);

    const pipeline = [
        {
            "$search": {
                "index": "searchJobs",
                "compound": {
                    "must": query
                }
            }
        }
    ]

    //Get Result
    await getJobs()
        .aggregate(pipeline)
        .toArray()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
        })
}