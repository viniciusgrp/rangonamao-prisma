import { Router } from 'express';

import CategoryController from '../controllers/category.controller';

const router = Router();

router.post('/', CategoryController.createCategory);

router.get('/:storeId', CategoryController.getCategories);

router.put('/:id', CategoryController.updateCategory);

router.delete('/:id', CategoryController.deleteCategory);

export default router;
