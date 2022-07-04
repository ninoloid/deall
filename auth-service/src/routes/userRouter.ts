import express from 'express';
import {registerUser, userDetail} from '../handlers';

const router = express.Router();

router.get('/register', (req, res) => res.send('ok'))
router.post('/register', registerUser);
router.get('/:id', userDetail)

export {router as userRouter}
