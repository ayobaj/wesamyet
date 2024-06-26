import express from 'express';
import { createListing, deleteListing, editListing, getListing, getListings } from '../controllers/createLsitingController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', verifyToken, createListing);

router.delete('/delete/:id', verifyToken, deleteListing);

router.post('/edit/:id', verifyToken, editListing);

router.get('/get/:id', getListing);

router.get('/get', getListings)

export default router;