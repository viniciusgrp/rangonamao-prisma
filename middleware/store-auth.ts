import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { MiddlewareFunction, AuthenticatedRequest } from '../types/middleware';

interface StoreTokenPayload {
  storeId: string;
  email: string;
}

export const authenticateStore: MiddlewareFunction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token not provided' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as StoreTokenPayload;
    req.storeId = decoded.storeId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid' });
  }
};

export const checkStoreOwnership: MiddlewareFunction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const storeId = req.storeId;

  if (!storeId) {
    res.status(401).json({ error: 'Store not authenticated' });
    return;
  }

  try {
    const store = await prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      res.status(404).json({ error: 'Store not found' });
      return;
    }

    if (store.id !== storeId) {
      res.status(403).json({ error: 'Not authorized to access this store' });
      return;
    }

    next();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkProductOwnership: MiddlewareFunction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const storeId = req.storeId;

  if (!storeId) {
    res.status(401).json({ error: 'Store not authenticated' });
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const category = await prisma.category.findUnique({
      where: { id: product.categoryId },
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    if (category.storeId !== storeId) {
      res.status(403).json({ error: 'Not authorized to access this product' });
      return;
    }

    next();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}; 