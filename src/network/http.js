import axios from "axios";
import axiosRetry from "axios-retry";

const defaultRetryConfig = {
    retries : 5,
    initialDelayMs: 100,
}
export default class HttpClient{
    constructor(baseURL, authErrorEventBus, config = defaultRetryConfig){
        this.authErrorEventBus = authErrorEventBus;
        this.client = axios.create({
            baseURL: baseURL,
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        });
        axiosRetry(this.client, {
            retries: config.retries,
            retryDelay: (retry) =>{
                const delay = Math.pow(2,retry) * config.initialDelayMs;
                const jitter = delay * 0.1 * Math.random();
                return delay + jitter;
            },
            retryCondtion: (err)=> 
                axiosRetry.isNetworkOrIdempotentRequestError(err) 
                || err.response.status === 429,
        })
    }

    async fetch(url, options){
        const {body, method, headers} = options;
        const req = {
            url,
            method,
            headers:{
                ...headers,
                // 'carrot-job-csrf-token':this.getCsrfToken(),
            },
            data: body,
        }
        
        try{
            const res = await this.client(req);
            return res.data;
        }catch(err){
            if(err.response){
                const data = err.response.data;
                const message = data && data.message ? data.message : 'Somthing went wrong!';
                throw new Error(message);
            }
            throw new Error('connection error');
        }
    }
}