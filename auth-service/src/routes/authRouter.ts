import express from 'express';
import {userLogin} from '../handlers';

const router = express.Router();

router.post('/login', userLogin)

export {router as authRouter}
