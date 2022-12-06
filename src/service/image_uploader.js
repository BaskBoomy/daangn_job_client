import {sha1} from 'crypto-hash';
class ImageUploader {
    constructor(http) {
        this.http = http;
    }

    async upload(files) {
        const url = 'https://api.cloudinary.com/v1_1/dcizjmtey/upload';
        const images = [];
        return new Promise(async function (resolve, reject) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i]);
                let file = files[i];
                let formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'wjamgaa6');
                await fetch(url, {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json().then(data => ({
                    data: data,
                    status: response.status
                })
                ).then(res => {
                    images.push({
                        fileURL: res.data.url,
                        public_id: res.data.public_id
                    })
                }))
                .catch((error) => reject(error));
            }
            resolve(images);
        })
    }

    async delete(public_id) {
        const url = 'https://api.cloudinary.com/v1_1/dcizjmtey/image/destroy';
        const apiKey = process.env.REACT_APP_CLOUDINARY_APIKEY;
        const timestamp = Date.now() + "";
        const publicId = public_id;
        let signature ='';
        await this.createSignature(publicId, timestamp)
        .then(result=>{signature=result;});
        const data = new FormData();
        data.append('public_id', publicId);
        data.append('api_key', apiKey);
        data.append('timestamp', timestamp);
        data.append('signature', signature);
        const result = await fetch(url,{
            method: 'POST',
            body: data,
        });
        if (result.status === 200) {
        }
    }
    createSignature = async (publicId, timestamp) => {
        const apiSecret = process.env.REACT_APP_CLOUDINARY_APISECRET;
        var signature = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
        return await sha1(signature);
    }
}
export default ImageUploader;