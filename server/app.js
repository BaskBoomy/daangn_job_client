import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import postRouter from './router/jobs.js';
import authRouter from './router/auth.js';
import locationRouter from './router/location.js';
import imageRouter from './router/image.js';
import {config} from './config.js';
import 'express-async-errors'; //비동기 처리함수를 가장 마지막 error처리하는 middleware로 전달하기위한 라이브러리
import {connectDB} from './database/database.js';
import {connectRedis} from './database/redis.js';

const app = express();
const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
    credentials: true, // allow the Access-Control-Allow-Credentials
};
app.use(cors(corsOption));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/jobs',postRouter);
app.use('/auth', authRouter);
app.use('/location', locationRouter);
app.use('/image', imageRouter);

app.post('/test',(req,res)=>{
    const time = req.body.time;
    const result = parseInt(time.split(':')[0]);
    res.json(result);
})
app.get('/', (req,res,next)=>{
    res.send('Welcome to Carrot-Job Project.');
})

app.use((req,res,next)=>{
    res.status(404).send('Not available!!');
})
app.use((error, req,res,next)=>{
    console.error(error);
    res.status(500).json({message: 'Error!!'});
})

connectDB().then(db=>{
    console.log('DB에 연결되었습니다.');
    connectRedis();
    app.listen(config.host.port);
})
.catch(console.error);