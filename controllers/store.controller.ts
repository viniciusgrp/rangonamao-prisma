import { Request, Response } from 'express';

import StoreModel from '../models/store.models';

class StoreController {
  async createStore(req: Request, res: Response) {
    try {
      const store = await StoreModel.createStore(req.body);
      res.status(201).json(store);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getStores(req: Request, res: Response) {
    try {
      const stores = await StoreModel.getStores();
      res.status(200).json(stores);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getStoreById(req: Request, res: Response) {
    try {
      const store = await StoreModel.getStoreById(req.params.id);
      res.status(200).json(store);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateStore(req: Request, res: Response) {
    try {
      const store = await StoreModel.updateStore(req.params.id, req.body);
      res.status(200).json(store);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new StoreController();
