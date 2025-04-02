import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class StoreSessionController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const store = await prisma.store.findUnique({
        where: { email },
      });

      if (!store) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, store.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { storeId: store.id, email: store.email },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1d' }
      );

      const { password: _, ...storeWithoutPassword } = store;

      return res.json({
        token,
        store: storeWithoutPassword,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new StoreSessionController(); 