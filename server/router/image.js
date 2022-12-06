import express from 'express';
import fetch from 'node-fetch';
import multer from 'multer';
const router = express.Router();
const upload = multer();
router.post('/upload', upload.single('postImages'),async (req, res)=>{
    console.log(req.body);
    const files = req.body;
    const result = await fetch(
        'https://api.cloudinary.com/v1_1/dcizjmtey/upload',
        {
            method: 'POST',
            body: files,
        }
    )
    // console.log(result);
    if(result.status !== 200){
        return res.status(result.status).send(result);
    }
    
    return res.send(result.json());
});
export default router;