import { Router } from 'express';
import { login, signup } from '../controllers/auth.js';
import validate from '../middlewares/validate.js';
import { loginValidation, signupValidation } from '../validations/validation.js';
const authRoutes = Router();

authRoutes.post('/signup', validate(signupValidation), signup);
authRoutes.post('/login', validate(loginValidation), login);

export default authRoutes;
