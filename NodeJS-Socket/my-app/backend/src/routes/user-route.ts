import express from 'express';
import { getAllUsers, getCurrentUser } from '../controllers/user-controller';
const router = express.Router();

router.get('/getAll', getAllUsers);
router.get('/me', getCurrentUser);

export default router;