import { Response } from 'express';
import ProductModel from '../models/product.models';
import { productResponseSchema, productsResponseSchema } from '../schemas/product.schema';
import { AuthenticatedRequest } from '../types/middleware';
import { ControllerFunction } from '../types/controller';

const ProductController = {
  createProduct: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const storeId = req.storeId;

      if (!storeId) {
        res.status(401).json({ message: 'Store not authenticated' });

        return;
      }

      const product = await ProductModel.createProduct(req.body, storeId);
      const validatedProduct = productResponseSchema.parse(product);

      res.status(201).json(validatedProduct);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getProducts: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const products = await ProductModel.getProducts();
      const validatedProducts = productsResponseSchema.parse(products);

      res.status(200).json(validatedProducts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getProductById: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const product = await ProductModel.getProductById(req.params.id);

      if (!product) {
        res.status(404).json({ message: 'Product not found' });

        return;
      }
      const validatedProduct = productResponseSchema.parse(product);

      res.status(200).json(validatedProduct);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  updateProduct: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const storeId = req.storeId;

      if (!storeId) {
        res.status(401).json({ message: 'Store not authenticated' });

        return;
      }

      const product = await ProductModel.updateProduct(req.params.id, req.body, storeId);
      const validatedProduct = productResponseSchema.parse(product);

      res.status(200).json(validatedProduct);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  deleteProduct: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const product = await ProductModel.deleteProduct(req.params.id);
      const validatedProduct = productResponseSchema.parse(product);

      res.status(200).json(validatedProduct);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,
};

export default ProductController;
