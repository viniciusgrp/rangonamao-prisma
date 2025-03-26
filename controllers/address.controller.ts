import { Request, Response } from 'express';
import AddressModel from '../models/address.model';

class AddressController {
  async createAddress(req: Request, res: Response) {
    try {
      const address = await AddressModel.createAddress(req.body);
      res.status(201).json(address);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAddresses(req: Request, res: Response) {
    try {
      const addresses = await AddressModel.getAddresses();
      res.status(200).json(addresses);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAddressById(req: Request, res: Response) {
    try {
      const address = await AddressModel.getAddressById(req.params.id);
      res.status(200).json(address);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateAddress(req: Request, res: Response) {
    try {
      const address = await AddressModel.updateAddress(req.params.id, req.body);
      res.status(200).json(address);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AddressController();
