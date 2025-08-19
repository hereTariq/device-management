import { Router } from 'express';
import authRoutes from './auth.js';
import deviceRoutes from './device.js';
import { authentication } from '../middlewares/auth.js';

const router = Router();

router.use('/auth', authRoutes)
router.use('/devices', authentication, deviceRoutes);

export default router;