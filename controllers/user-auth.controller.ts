import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ControllerFunction } from '../types/controller';
import UserModel from '../models/user.models';
import { userResponseSchema } from '../schemas/user.schema';

const UserAuthController = {
  login: (async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getUserByEmailWithPassword(email);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      const token = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' },
      );

      const validatedUser = userResponseSchema.parse(user);
      res.json({ user: validatedUser, token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,
};

export default UserAuthController;
