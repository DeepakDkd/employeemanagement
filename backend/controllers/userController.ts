import { Request, Response } from 'express';
import db from '../model/index'; 

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
