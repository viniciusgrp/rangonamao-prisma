import { Request, Response } from 'express';
import StoreModel from '../models/store.models';
import { storeResponseSchema } from '../schemas/store.schema';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const store = await StoreModel.getStoreByEmail(email);

    if (!store) {
      res.status(401).json({ message: 'Invalid credentials' });

      return;
    }

    const isValidPassword = compareSync(password, store.password);

    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });

      return;
    }

    const token = jwt.sign({ storeId: store.id }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '1d',
    });

    const validatedStore = storeResponseSchema.parse(store);

    res.status(200).json({
      store: validatedStore,
      token,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
