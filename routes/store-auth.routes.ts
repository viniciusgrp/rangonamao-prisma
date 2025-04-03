import { Router } from 'express';
import { login } from '../controllers/store-auth.controller';

const router = Router();

/**
 * @swagger
 * /store-auth/login:
 *   post:
 *     summary: Login da loja
 *     tags: [Store Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email da loja
 *               password:
 *                 type: string
 *                 description: Senha da loja
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token para autenticação
 *                 store:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     url:
 *                       type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', login);

export default router;
