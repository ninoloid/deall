import express, {Request, Response} from 'express';
import { UserRole } from '../../core/src/common/Constants';
import { authenticationMiddleware } from '../middlewares/auth';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Wokey')
})
router.get(
  '/admin-only', authenticationMiddleware([UserRole.ADMIN]),
  (req: Request, res: Response) => res.send('Success. This is the admin-only route')
)

export {router as testRouter}
