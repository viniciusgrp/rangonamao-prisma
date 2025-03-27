import { Request, Response } from 'express';
import UserModel from '../models/user.models';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await UserModel.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.getUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserModel.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await UserModel.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();