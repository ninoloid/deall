import express from 'express';
import {userLogin, userRefreshToken} from '../handlers';
import {authenticationMiddleware} from '../middlewares/auth';

const router = express.Router();

router.post('/login', userLogin)
router.post('/refresh-token', authenticationMiddleware(), userRefreshToken)

export {router as authRouter}
