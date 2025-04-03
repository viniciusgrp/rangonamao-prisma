import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest } from '../types/middleware';
import dotenv from 'dotenv';

dotenv.config();

interface StoreTokenPayload {
  storeId: string;
  email?: string;
}

interface TokenPayload {
  storeId: string;
  iat: number;
  exp: number;
}

export const authenticateStore = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    res.status(401).json({ error: 'Token error' });
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ error: 'Token malformatted' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TokenPayload;

    const store = await prisma.store.findUnique({
      where: { id: decoded.storeId },
    });

    if (!store) {
      res.status(401).json({ error: 'Store not found' });
      return;
    }

    req.storeId = store.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const checkStoreOwnership = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { storeId } = req.params;
  const authenticatedStoreId = req.storeId;

  if (!authenticatedStoreId) {
    res.status(401).json({ error: 'Store not authenticated' });
    return;
  }

  if (storeId !== authenticatedStoreId) {
    res.status(403).json({ error: 'Not authorized to access this store' });
    return;
  }

  next();
};

export const checkProductOwnership = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;
  const storeId = req.storeId;

  if (!storeId) {
    res.status(401).json({ error: 'Store not authenticated' });
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (product.category.storeId !== storeId) {
      res.status(403).json({ error: 'Not authorized to access this product' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
