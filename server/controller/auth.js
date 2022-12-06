import crypto from 'crypto';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';
import * as likedJobPostRepository from '../data/likedJobPost.js';
import * as Redis from '../database/redis.js';

export async function signUp(req, res) {
    const { myplace, phoneNumber, image, nickname } = req.body;
    const found = await userRepository.findByPhoneNumber(phoneNumber);
    if (found) {
        return res.json({ message: `${phoneNumber}로 등록된 사용자가 이미 존재합니다.` });
    }
    const userId = await userRepository.createUser({
        myplace, phoneNumber, image, nickname
    })
    const user = { userId, myplace, phoneNumber, image, nickname };
    console.log(user);
    const token = createJwtToken(userId);
    setToken(res, token);
    res.status(201).json({ user, token });
}

export async function login(req, res) {
    const { phoneNumber } = req.body;
    const user = await userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
        return res.json({ message: '등록되지 않은 사용자입니다.' });
    }

    const token = createJwtToken(user.id);
    setToken(res, token);
    res.status(200).json({ user, token });
}

export async function logout(req, res) {
    res.cookie('token', '');
    res.status(200).json({ message: '로그아웃 성공!' });
}

export async function me(req, res) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다!' });
    }
    res.status(200).json(user);
}

export async function update(req, res) {
    try {
        const user = await userRepository.findById(req.userId);
        const updateData = req.body.updateData;
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다!' });
        }

        const updated = await userRepository.update(req.userId, updateData);
        res.status(200).json(updated);
    } catch (e) {
        console.log(e);
    }
}
export async function sendSMSCode(req, res) {
    const to = req.body.number.replace(/-/g, "");
    const code = create6DigitCode();
    await saveAuthCode(`sms-code-${to}`, code)
        .then(async () => {
            console.log(code);
            return res.status(200).send({ result: 200 });
            // const result = await sendMessage(to, code);
            // if (result) {
            //     return res.status(200).send({ message: "문자 발송 완료", result:200 });
            // } else {
            //     return res.status(500).send({ message: "문자 발송 실패", result:500 });
            // }
        });
}

export async function verifySMSCode(req, res) {
    const code = req.body.code;
    const to = req.body.to.replace(/-/g, "");


    const result = await compareAuthCode(`sms-code-${to}`, code.toString());

    if (result) {
        return res.status(200).send({ message: "확인 완료", result: 200 });
    } else {
        return res.status(203).send({ message: "번호가 일치하지 않습니다.", result: 203 });
    }
}


export async function getCurrentJobPostLikeStatus(req, res) {
    const jobPostId = req.query.jobPostId;
    const userId = req.userId;
    const isLike = await likedJobPostRepository.getIsLike(jobPostId, userId);
    res.status(200).json(isLike);
}

export async function updateJobPostLike(req, res) {
    const jobPost = req.body.jobPost;
    const newJobPost = {
        jobPostId: jobPost.id,
        title: jobPost.title,
        place: jobPost.place,
        updatedFromUser: jobPost.updatedFromUser,
        salary: jobPost.salary,
        pay: jobPost.pay,
        date: jobPost.date,
        time: jobPost.time,
        images: [jobPost.images[0]],
        isLike: jobPost.isLike
    }
    const userId = req.userId;
    const result = await likedJobPostRepository.updateJobPostLike(newJobPost, userId);
    res.status(200).json(result);
    // res.status(200);

}

export async function getLikedList(req, res) {
    const userId = req.userId;
    const result = await likedJobPostRepository.getLikedList(userId);
    if (result) {
        return res.status(200).json(result);
    }
}




//6자리 random 숫자 생성
const create6DigitCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code + "";
}

// redis에 key-value 형태로 저장 : 3분후에 exprire
const saveAuthCode = async (key, code) => {
    await Redis.setKey(key, code);
};

const compareAuthCode = async (key, code) => {
    const value = await Redis.getValue(key);
    if (code == value) {
        await Redis.deleteKey(key);
        return true;
    } else {
        return false;
    }
};

const makeSignature = (method, url, timestamp, accessKey, secretKey) => {
    var space = " ";
    var newLine = "\n";

    const hmac = crypto.createHmac('SHA256', secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    return hmac.digest('base64');
}

const sendMessage = async (to, code) => {
    const SERVICE_ID = config.naverCloud.serviceId;
    const SECRET_KEY = config.naverCloud.secretKey;
    const ACCESS_KEY = config.naverCloud.accessKey;
    const timestamp = Date.now() + "";
    const method = 'POST';
    const url = `/sms/v2/services/${SERVICE_ID}/messages`;
    const body = JSON.stringify({
        "type": "SMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": "01097735873",
        "content": "SNS Authentication by Jack's personal node js backend server project",
        "messages": [
            {
                "to": to,
                "content": `[당근알바 프로젝트] 인증번호 [${code}]를 입력해주세요.`
            }
        ]
    });
    const signature = makeSignature(method, url, timestamp, ACCESS_KEY, SECRET_KEY);
    const response = await fetch(
        `https://sens.apigw.ntruss.com/sms/v2/services/${SERVICE_ID}/messages`,
        {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-ncp-apigw-timestamp": timestamp,
                "x-ncp-iam-access-key": ACCESS_KEY,
                "x-ncp-apigw-signature-v2": signature,
            },
            body: body,
        }
    );
    const result = await response.json();
    if (result.statusCode === "202") {
        console.info("문자 전송 성공");
        return 1;
    } else {
        console.error("문자 전송 실패");
        return 0;
    }
}

function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}


function setToken(res, token) {
    const options = {
        maxAge: config.jwt.expiresInSec * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }
    res.cookie('token', token, options);
}
// export async function setProfile(req, res){
    //     const userId = req.params.id;
    //     const {image, nickname} = req.body;
    //     const user = await userRepository.findById(userId);
    //     if(!user){
    //         return res.status(404).json({message:'User not found'});
    //     }
    //     const updated = await userRepository.setProfile(userId, image, nickname);
    //     if(!updated){
    //         return res.status(404).json({message:'Failed to set user profile information'});
    //     }
    
    //     return res.status(200).json(updated);
    // }