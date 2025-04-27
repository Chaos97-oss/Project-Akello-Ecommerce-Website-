// import signUp from '../../controller/authController/signUp';
import login from '../../controller/authController/login.js';
import signUp, {protect, isAdmin} from '../../controller/authController/signUp.js';
import forgotPassword from '../../controller/authController/forgotPassword.js';
import express from 'express';


const router = express.Router();

// Route for user signup & login
router.post('/signup', signUp);//for basic user sign up
router.post('/admin/login',protect, isAdmin, signUp ) //Only logged-in admins (with valid JWT) can create an admin.
router.post('/login', login);//login for every user 
router.post('/forgot-password', forgotPassword)
export default router;
