import { Request, Response } from 'express';
import UserModel from '../models/user.models';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ControllerFunction } from '../types/controller';

dotenv.config();

class SessionController {
  createSession: ControllerFunction = async (req: Request, res: Response) => {
    const { email, password, tipo } = req.body;

    if (tipo === 'user') {
      const user = await UserModel.getUserByEmailWithPassword(email);

      if (!user) {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });

        return;
      }

      const isPasswordValid = compareSync(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });

        return;
      }

      res.status(200).json({
        token: jwt.sign({ userId: user.userId }, process.env.JWT_SECRET as string, {
          expiresIn: '24h',
        }),
      });
    } else {
      res.status(401).json({ message: 'Tipo de usuário inválido' });
    }
  };
}

export default new SessionController();
