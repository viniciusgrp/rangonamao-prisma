import { Request, Response } from 'express';
import UserModel from '../models/user.models';
import { userResponseSchema, usersResponseSchema } from '../schemas/user.schema';
import { ControllerFunction } from '../types/controller';

const UserController = {
  createUser: (async (req: Request, res: Response) => {
    try {
      const user = await UserModel.createUser(req.body);
      const validatedUser = userResponseSchema.parse(user);

      res.status(201).json(validatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getUsers: (async (req: Request, res: Response) => {
    try {
      const users = await UserModel.getUsers();
      const validatedUsers = usersResponseSchema.parse(users);

      res.status(200).json(validatedUsers);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getUserById: (async (req: Request, res: Response) => {
    try {
      const user = await UserModel.getUserById(req.params.id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });

        return;
      }
      const validatedUser = userResponseSchema.parse(user);

      res.status(200).json(validatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  updateUser: (async (req: Request, res: Response) => {
    try {
      const user = await UserModel.updateUser(req.params.id, req.body);
      const validatedUser = userResponseSchema.parse(user);

      res.status(200).json(validatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  deleteUser: (async (req: Request, res: Response) => {
    try {
      const user = await UserModel.deleteUser(req.params.id);
      const validatedUser = userResponseSchema.parse(user);

      res.status(200).json(validatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,
};

export default UserController;
