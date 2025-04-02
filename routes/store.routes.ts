import { Router } from 'express';
import StoreController from '../controllers/store.controller';

const router = Router();

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Cria uma nova loja
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - url
 *               - email
 *               - password
 *               - description
 *               - street
 *               - city
 *               - state
 *               - zipCode
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da loja
 *               url:
 *                 type: string
 *                 description: URL única da loja
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email da loja
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha da loja
 *               description:
 *                 type: string
 *                 description: Descrição da loja
 *               logo:
 *                 type: string
 *                 description: URL do logo da loja
 *               phone:
 *                 type: string
 *                 description: Telefone da loja
 *               color:
 *                 type: string
 *                 description: Cor principal da loja
 *               background:
 *                 type: string
 *                 description: URL do background da loja
 *               street:
 *                 type: string
 *                 description: Rua da loja
 *               city:
 *                 type: string
 *                 description: Cidade da loja
 *               state:
 *                 type: string
 *                 description: Estado da loja
 *               zipCode:
 *                 type: string
 *                 description: CEP da loja
 *     responses:
 *       201:
 *         description: Loja criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 url:
 *                   type: string
 *                 email:
 *                   type: string
 *                 description:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 color:
 *                   type: string
 *                 background:
 *                   type: string
 *                 street:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 */
router.post('/', StoreController.createStore);

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Retorna a lista de lojas
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de lojas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   url:
 *                     type: string
 *                   email:
 *                     type: string
 *                   description:
 *                     type: string
 *                   logo:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   color:
 *                     type: string
 *                   background:
 *                     type: string
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', StoreController.getStores);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Retorna uma loja específica
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da loja
 *     responses:
 *       200:
 *         description: Loja encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 url:
 *                   type: string
 *                 email:
 *                   type: string
 *                 description:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 color:
 *                   type: string
 *                 background:
 *                   type: string
 *                 street:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Loja não encontrada
 */
router.get('/:id', StoreController.getStoreById);

/**
 * @swagger
 * /stores/{id}:
 *   put:
 *     summary: Atualiza uma loja
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da loja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da loja
 *               url:
 *                 type: string
 *                 description: URL única da loja
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email da loja
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Nova senha da loja
 *               description:
 *                 type: string
 *                 description: Descrição da loja
 *               logo:
 *                 type: string
 *                 description: URL do logo da loja
 *               phone:
 *                 type: string
 *                 description: Telefone da loja
 *               color:
 *                 type: string
 *                 description: Cor principal da loja
 *               background:
 *                 type: string
 *                 description: URL do background da loja
 *               street:
 *                 type: string
 *                 description: Rua da loja
 *               city:
 *                 type: string
 *                 description: Cidade da loja
 *               state:
 *                 type: string
 *                 description: Estado da loja
 *               zipCode:
 *                 type: string
 *                 description: CEP da loja
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 url:
 *                   type: string
 *                 email:
 *                   type: string
 *                 description:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 color:
 *                   type: string
 *                 background:
 *                   type: string
 *                 street:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Loja não encontrada
 */
router.put('/:id', StoreController.updateStore);

router.delete('/:id', StoreController.deleteStore);

export default router;
