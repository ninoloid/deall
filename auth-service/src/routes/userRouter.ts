import express from 'express';
import {registerUser, userDetail} from '../handlers';
import {
  authenticationMiddleware,
  // authorizationMiddleware
} from '../middlewares/auth';

const router = express.Router();

router.post('/register', registerUser);
router.get('/:id', authenticationMiddleware(), userDetail)

export {router as userRouter}
