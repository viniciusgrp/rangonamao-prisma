import { Router } from 'express';
import StoreController from '../controllers/store.controller';

const router = Router();

router.post('/', StoreController.createStore);

router.get('/', StoreController.getStores);

router.get('/:id', StoreController.getStoreById);

router.put('/:id', StoreController.updateStore);

// router.delete('/:id', StoreController.deleteStore);

export default router;
