import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import pool from '../config/db';

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await pool.query('SELECT id, name, email, skills FROM users WHERE id = $1', [
            req.user.id,
        ]);

        if (user.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
    const { name, email, skills } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);

        if (user.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const updatedUser = await pool.query(
            'UPDATE users SET name = $1, email = $2, skills = $3 WHERE id = $4 RETURNING id, name, email, skills',
            [name || user.rows[0].name, email || user.rows[0].email, skills || user.rows[0].skills, req.user.id]
        );

        res.json(updatedUser.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
