import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { uploadResume } from '../controllers/resumeController';
import { protect } from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/profile', protect, getUserProfile as any);
router.put('/profile', protect, updateUserProfile as any);
router.post('/resume', protect, upload.single('resume'), uploadResume as any);

export default router;
