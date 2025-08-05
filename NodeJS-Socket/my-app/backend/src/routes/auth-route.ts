import express from 'express';
import { userLogin, userRegister } from '../controllers/auth-controller';

const router = express.Router();

router.post('/login', userLogin);
router.post('/register', userRegister);

export default router;