import { Request, Response } from 'express';
import CategoryModel from '../models/category.model';

class CategoryController {
  async createCategory(req: Request, res: Response) {
    const category = await CategoryModel.createCategory(req.body);
    res.status(201).json(category);
  }

  async getCategories(req: Request, res: Response) {
    const storeId = req.params.storeId;

    const categories = await CategoryModel.getCategories(storeId);
    res.status(200).json(categories);
  }

  async updateCategory(req: Request, res: Response) {
    const category = await CategoryModel.updateCategory(req.params.id, req.body);
    res.status(200).json(category);
  }

  async deleteCategory(req: Request, res: Response) {
    const category = await CategoryModel.deleteCategory(req.params.id);
    res.status(200).json(category);
  }
}

export default new CategoryController();
