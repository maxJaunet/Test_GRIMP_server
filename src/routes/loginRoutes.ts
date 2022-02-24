import express from 'express';
import {checkLoginData} from '../controllers/loginData';

const router = express.Router();


router.post('/', checkLoginData);


export default router;