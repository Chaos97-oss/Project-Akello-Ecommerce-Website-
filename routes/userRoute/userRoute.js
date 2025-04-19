import express from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../../controller/userController/userController.js';
import signUp, { protect, isAdmin } from '../../controller/authController/signUp.js';
const router = express.Router();

router.post('/create-user', createUser);
router.get('/', protect,isAdmin, getUsers);
router.get('/:userId', protect,isAdmin, getUser);
router.put('/update-user/:userId', updateUser);
router.delete('/delete-user/:userId', protect,isAdmin, deleteUser);

export default router;