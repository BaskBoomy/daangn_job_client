import express from 'express';
import * as locationController from '../controller/location.js';
// import KoreaCoordinate from '../data/coordinate/korea-coordinate.json' assert { type: "json" };
 
const router = express.Router();
router.get('/getNearAddress', locationController.getNearAddress);
router.get('/search',locationController.search);
// router.post('/addKoreaCoordinate', locationController.addKoreaCoordinate);

export default router;