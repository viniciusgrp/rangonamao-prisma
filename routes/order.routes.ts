import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os pedidos
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

// Buscar pedido por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

// Criar novo pedido
router.post('/', async (req, res) => {
  try {
    const order = await prisma.order.create({
      data: req.body
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// Atualizar pedido
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
});

// Deletar pedido
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar pedido' });
  }
});

export default router; 