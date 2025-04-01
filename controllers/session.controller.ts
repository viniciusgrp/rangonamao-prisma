import { Request, Response } from 'express';
import UserModel from '../models/user.models';
import StoreModel from '../models/store.models';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class SessionController {
  async createSession(req: any, res: any) {
    const { email, password, tipo } = req.body;

    if (tipo === 'user') {
      const user = await UserModel.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      const isPasswordValid = compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
      }

      return res.status(200).json({
        token: jwt.sign(
          { userId: user.userId },
          process.env.JWT_SECRET as string,
          {
            expiresIn: '24h',
          }
        ),
      });
    } else {
      return res.status(401).json({ message: 'Tipo de usuário inválido' });
    }
  }

  //   if (tipo === 'store') {
  //     const store = await StoreModel.getStoreByEmail(email);

  //     if (!store) {
  //       return res.status(401).json({ message: 'Invalid credentials' });
  //     }

  //     const isPasswordValid = compareSync(password, store.password);

  //     if (!isPasswordValid) {
  //       return res.status(401).json({ message: 'Invalid credentials' });
  //     }

  //     return {
  //       token: jwt.sign({ userId: store.id }, process.env.JWT_SECRET as string, {
  //         expiresIn: '24h',
  //       }),
  //     };
  //   }
}

export default new SessionController();
