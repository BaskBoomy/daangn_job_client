import {createClient} from 'redis';
import {config} from '../config.js';

let client;
export async function connectRedis(){
    client = createClient({
        legacyMode: true, //should not be there
        url: `redis://${config.redis.username}:${config.redis.password}@${config.redis.host}:${config.redis.port}`,
        // socket: {
        //     host: config.redis.host,
        //     port: config.redis.port
        // },
    });
    client.on('error',(err) => console.log('Redis Client Error', err));
    client.connect().then(()=>console.log('Redis Connected'));
};

export async function setKey(key, code){
    await client.v4.set(key, code, { EX: 180 });
}
export async function getValue(key){
    return await client.v4.get(key);
}
export async function deleteKey(key){
    await client.v4.del(key);
}
export async function disconnect(){
    await client.disconnect();
}

export async function getAllKeys(){
    await client.keys('*', (err, keys) => {
        console.log(keys);
    });
}