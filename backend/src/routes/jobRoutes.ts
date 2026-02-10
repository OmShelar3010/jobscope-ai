import express from 'express';
import { getJobs, createJob, getJobById, getRecommendedJobs } from '../controllers/jobController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getJobs as any);
router.get('/recommended', protect, getRecommendedJobs as any);
router.post('/', protect, createJob as any); // Protected for now
router.get('/:id', getJobById as any);

export default router;
