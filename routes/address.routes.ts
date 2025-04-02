import { Router } from 'express';
import AddressController from '../controllers/address.controller';

const router = Router();

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Cria um novo endereço
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - street
 *               - number
 *               - city
 *               - state
 *               - zipCode
 *               - storeId
 *             properties:
 *               street:
 *                 type: string
 *                 description: Nome da rua
 *               number:
 *                 type: string
 *                 description: Número do endereço
 *               complement:
 *                 type: string
 *                 description: Complemento do endereço
 *               city:
 *                 type: string
 *                 description: Cidade
 *               state:
 *                 type: string
 *                 description: Estado
 *               zipCode:
 *                 type: string
 *                 description: CEP
 *               storeId:
 *                 type: string
 *                 description: ID da loja
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', AddressController.createAddress);

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Retorna a lista de endereços
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   street:
 *                     type: string
 *                   number:
 *                     type: string
 *                   complement:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   storeId:
 *                     type: string
 */
router.get('/', AddressController.getAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Retorna um endereço específico
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do endereço
 *     responses:
 *       200:
 *         description: Endereço encontrado
 *       404:
 *         description: Endereço não encontrado
 */
router.get('/:id', AddressController.getAddressById);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Atualiza um endereço
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: Nome da rua
 *               number:
 *                 type: string
 *                 description: Número do endereço
 *               complement:
 *                 type: string
 *                 description: Complemento do endereço
 *               city:
 *                 type: string
 *                 description: Cidade
 *               state:
 *                 type: string
 *                 description: Estado
 *               zipCode:
 *                 type: string
 *                 description: CEP
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *       404:
 *         description: Endereço não encontrado
 */
router.put('/:id', AddressController.updateAddress);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Remove um endereço
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do endereço
 *     responses:
 *       200:
 *         description: Endereço removido com sucesso
 *       404:
 *         description: Endereço não encontrado
 */
router.delete('/:id', AddressController.deleteAddress);

export default router;
