import { Request, Response } from 'express';
import OrderModel from '../models/order.models';
import { orderResponseSchema, ordersResponseSchema } from '../schemas/order.schema';
import { ControllerFunction } from '../types/controller';

const OrderController = {
  createOrder: (async (req: Request, res: Response) => {
    try {
      const order = await OrderModel.createOrder(req.body);
      const validatedOrder = orderResponseSchema.parse(order);

      res.status(201).json(validatedOrder);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getOrders: (async (req: Request, res: Response) => {
    try {
      const orders = await OrderModel.getOrders();
      const validatedOrders = ordersResponseSchema.parse(orders);

      res.status(200).json(validatedOrders);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getOrderById: (async (req: Request, res: Response) => {
    try {
      const order = await OrderModel.getOrderById(req.params.id);

      if (!order) {
        res.status(404).json({ message: 'Order not found' });

        return;
      }
      const validatedOrder = orderResponseSchema.parse(order);

      res.status(200).json(validatedOrder);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  updateOrder: (async (req: Request, res: Response) => {
    try {
      const order = await OrderModel.updateOrder(req.params.id, req.body);
      const validatedOrder = orderResponseSchema.parse(order);

      res.status(200).json(validatedOrder);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  deleteOrder: (async (req: Request, res: Response) => {
    try {
      const order = await OrderModel.deleteOrder(req.params.id);
      const validatedOrder = orderResponseSchema.parse(order);

      res.status(200).json(validatedOrder);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,
};

export default OrderController;
