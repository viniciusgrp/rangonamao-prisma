import { Request, Response } from 'express';
import StoreModel from '../models/store.models';
import { storeResponseSchema, storesResponseSchema } from '../schemas/store.schema';
import { ControllerFunction } from '../types/controller';

const StoreController = {
  createStore: (async (req: Request, res: Response) => {
    try {
      const store = await StoreModel.createStore(req.body);
      const validatedStore = storeResponseSchema.parse(store);

      res.status(201).json(validatedStore);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getStores: (async (req: Request, res: Response) => {
    try {
      const stores = await StoreModel.getStores();
      const validatedStores = storesResponseSchema.parse(stores);

      res.status(200).json(validatedStores);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getStoreById: (async (req: Request, res: Response) => {
    try {
      const store = await StoreModel.getStoreById(req.params.id);

      if (!store) {
        res.status(404).json({ message: 'Store not found' });

        return;
      }
      const validatedStore = storeResponseSchema.parse(store);

      res.status(200).json(validatedStore);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  updateStore: (async (req: Request, res: Response) => {
    try {
      const store = await StoreModel.updateStore(req.params.id, req.body);
      const validatedStore = storeResponseSchema.parse(store);

      res.status(200).json(validatedStore);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  deleteStore: (async (req: Request, res: Response) => {
    try {
      const store = await StoreModel.deleteStore(req.params.id);
      const validatedStore = storeResponseSchema.parse(store);

      res.status(200).json(validatedStore);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,
};

export default StoreController;
