import { Router } from 'express';
import ProductIngredientController from '../controllers/product-ingredient.controller';
import { authenticateStore } from '../middleware/store-auth';
import { checkProductOwnership } from '../middleware/store-auth';
import { validate } from '../middleware/validate';
import { createProductIngredientSchema } from '../schemas/product-ingredient.schema';

const router = Router();

/**
 * @swagger
 * /products/{productId}/ingredients:
 *   post:
 *     summary: Adiciona um ingrediente a um produto
 *     tags: [Product Ingredients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ingredientId
 *             properties:
 *               ingredientId:
 *                 type: string
 *                 description: ID do ingrediente
 *     responses:
 *       201:
 *         description: Ingrediente adicionado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto ou ingrediente não encontrado
 */
router.post(
  '/products/:productId/ingredients',
  authenticateStore,
  checkProductOwnership,
  validate(createProductIngredientSchema),
  ProductIngredientController.createProductIngredient
);

/**
 * @swagger
 * /products/{productId}/ingredients:
 *   get:
 *     summary: Lista os ingredientes de um produto
 *     tags: [Product Ingredients]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Lista de ingredientes do produto
 *       404:
 *         description: Produto não encontrado
 */
router.get('/products/:productId/ingredients', ProductIngredientController.getProductIngredients);

/**
 * @swagger
 * /products/{productId}/ingredients/{id}:
 *   delete:
 *     summary: Remove um ingrediente de um produto
 *     tags: [Product Ingredients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da relação produto-ingrediente
 *     responses:
 *       204:
 *         description: Ingrediente removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto ou relação não encontrada
 */
router.delete(
  '/products/:productId/ingredients/:id',
  authenticateStore,
  checkProductOwnership,
  ProductIngredientController.deleteProductIngredient
);

/**
 * @swagger
 * /products/{productId}/ingredients:
 *   delete:
 *     summary: Remove todos os ingredientes de um produto
 *     tags: [Product Ingredients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Ingredientes removidos com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
router.delete(
  '/products/:productId/ingredients',
  authenticateStore,
  checkProductOwnership,
  ProductIngredientController.deleteProductIngredients
);

export default router;
