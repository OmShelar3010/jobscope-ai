import { Request, Response } from 'express';
import pool from '../config/db';

export const getAnalytics = async (req: Request, res: Response) => {
    try {
        const userCount = await pool.query('SELECT COUNT(*) FROM users');
        const jobCount = await pool.query('SELECT COUNT(*) FROM jobs');

        // Top skills analysis
        const topSkills = await pool.query(`
      SELECT unnest(skills) as skill, COUNT(*) as count 
      FROM users 
      GROUP BY skill 
      ORDER BY count DESC 
      LIMIT 5
    `);

        // Jobs by location
        const jobsByLocation = await pool.query(`
      SELECT location, COUNT(*) as count
      FROM jobs
      GROUP BY location
      ORDER BY count DESC
      LIMIT 5
    `);

        res.json({
            totalUsers: parseInt(userCount.rows[0].count),
            totalJobs: parseInt(jobCount.rows[0].count),
            topSkills: topSkills.rows,
            jobsByLocation: jobsByLocation.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
