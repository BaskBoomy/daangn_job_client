import express from 'express';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();
router.get('/me', isAuth,authController.me);
router.get('/getCurrentJobPostLikeStatus', isAuth,authController.getCurrentJobPostLikeStatus);
router.get('/getLikedList',isAuth, authController.getLikedList);

router.post('/signUp',authController.signUp);
router.post('/login',authController.login);
router.post('/logout', authController.logout);
router.post('/sendSMSCode', authController.sendSMSCode);
router.post('/verifySMSCode', authController.verifySMSCode);
router.post('/updateJobPostLike', isAuth, authController.updateJobPostLike);

// router.put('/setProfile/:id', authController.setProfile);
router.put('/update',isAuth, authController.update);


export default router;