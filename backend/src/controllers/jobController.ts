import { Request, Response } from 'express';
import pool from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';
import { getIO } from '../utils/socket';
import redisClient from '../utils/cache';

// Get all jobs with Caching
export const getJobs = async (req: Request, res: Response) => {
    try {
        const cachedJobs = await redisClient.get('all_jobs');
        if (cachedJobs) {
            res.json(JSON.parse(cachedJobs));
            return;
        }

        const jobs = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');

        await redisClient.set('all_jobs', JSON.stringify(jobs.rows), {
            EX: 3600 // Cache for 1 hour
        });

        res.json(jobs.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new job
export const createJob = async (req: AuthRequest, res: Response) => { // Assuming admin/employer only later
    const { title, company, location, salary, description, skills } = req.body;

    try {
        const newJob = await pool.query(
            'INSERT INTO jobs (title, company, location, salary, description, skills) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, company, location, salary, description, skills]
        );

        // Emit socket event
        try {
            getIO().emit('new-job', newJob.rows[0]);
        } catch (e) {
            console.error('Socket emit failed', e);
        }

        // Invalidate cache if implemented
        await redisClient.del('all_jobs');

        res.status(201).json(newJob.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get job by ID
export const getJobById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const job = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);

        if (job.rows.length === 0) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        res.json(job.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get recommended jobs based on user skills
export const getRecommendedJobs = async (req: AuthRequest, res: Response) => {
    try {
        const user = await pool.query('SELECT skills FROM users WHERE id = $1', [req.user.id]);
        const userSkills = user.rows[0]?.skills || [];

        if (userSkills.length === 0) {
            // If no skills, return recent jobs
            const jobs = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC LIMIT 10');
            res.json(jobs.rows);
            return;
        }

        // AI Matching Logic:
        // 1. Calculate Intersection Count
        // 2. We can also add tf-idf logic here if we pre-calculated job/user vector, 
        // but for MVP, weighted overlap is good.
        // Order by number of overlapping skills descending.

        const jobs = await pool.query(
            `SELECT *, 
       (SELECT COUNT(*) FROM unnest(skills) s WHERE s = ANY($1::text[])) as match_score
       FROM jobs 
       WHERE skills && $1 
       ORDER BY match_score DESC, created_at DESC`,
            [userSkills]
        );

        res.json(jobs.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
