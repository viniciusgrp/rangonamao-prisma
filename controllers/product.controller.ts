import { Request, Response } from 'express';
import ProductModel from '../models/product.model';

class ProductController {
  async createProduct(req: Request, res: Response) {
    const product = await ProductModel.createProduct(req.body);
    res.status(201).json(product);
  }

  async getProducts(req: Request, res: Response) {
    const products = await ProductModel.getProducts();
    res.status(200).json(products);
  }

  async updateProduct(req: Request, res: Response) {
    const product = await ProductModel.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  }

  async deleteProduct(req: Request, res: Response) {
    const product = await ProductModel.deleteProduct(req.params.id);
    res.status(200).json(product);
  }
}

export default new ProductController();
