import { Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { AuthenticatedRequest } from '../types/middleware';
import { ControllerFunction } from '../types/controller';

const ProductController = {
  createProduct: (async (req: AuthenticatedRequest, res: Response) => {
    const { name, description, price, categoryId, image } = req.body;
    const storeId = req.storeId;

    if (!storeId) {
      res.status(401).json({ error: 'Store not authenticated' });
      return;
    }

    try {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      if (category.storeId !== storeId) {
        res.status(403).json({ error: 'Not authorized to create product in this category' });
        return;
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          image,
          categoryId,
        },
      });

      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  getProducts: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
      });

      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  updateProduct: (async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { name, description, price, categoryId, image } = req.body;
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
        where: { id: categoryId },
      });

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      if (category.storeId !== storeId) {
        res.status(403).json({ error: 'Not authorized to update product in this category' });
        return;
      }

      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          image,
          categoryId,
        },
      });

      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  deleteProduct: (async (req: AuthenticatedRequest, res: Response) => {
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
        res.status(403).json({ error: 'Not authorized to delete this product' });
        return;
      }

      await prisma.product.delete({
        where: { id },
      });

      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,
};

export default ProductController;
