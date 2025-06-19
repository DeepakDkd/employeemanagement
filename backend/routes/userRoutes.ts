import { Router } from 'express';
import {  createUser, getAllUsers } from '../controllers/userController';

const router: Router = Router();

router.get('/', getAllUsers);
router.post('/create-user',createUser);

export default router;
