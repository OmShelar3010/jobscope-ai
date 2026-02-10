import express from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Admin only ideally, but for now protected is fine
router.get('/', protect, getAnalytics as any);

export default router;
