import express from 'express';
import {registerUser, userDetail} from '../handlers';

const router = express.Router();

router.post('/register', registerUser);
router.get('/:id', userDetail)

export {router as userRouter}
