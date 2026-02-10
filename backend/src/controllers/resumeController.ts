import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import pool from '../config/db';
import { parseResume } from '../services/resumeService';
import { extractSkills } from '../utils/nlp';
import fs from 'fs';

export const uploadResume = async (req: AuthRequest, res: Response) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }

    try {
        const text = await parseResume(req.file.path);
        const skills = extractSkills(text);

        // Update user skills in DB (merge with existing or replace?) - Let's merge for now
        const user = await pool.query('SELECT skills FROM users WHERE id = $1', [req.user.id]);
        const existingSkills = user.rows[0]?.skills || [];
        const newSkills = Array.from(new Set([...existingSkills, ...skills]));

        await pool.query('UPDATE users SET skills = $1 WHERE id = $2', [newSkills, req.user.id]);

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.json({ message: 'Resume parsed successfully', skills: newSkills });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to process resume' });
    }
};
