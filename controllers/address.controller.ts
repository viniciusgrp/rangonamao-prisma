import { Request, Response } from 'express';
import AddressModel from '../models/address.models';
import { addressResponseSchema, addressesResponseSchema } from '../schemas/address.schema';
import { ControllerFunction } from '../types/controller';

const AddressController = {
  createAddress: (async (req: Request, res: Response) => {
    try {
      const address = await AddressModel.createAddress(req.body);
      const validatedAddress = addressResponseSchema.parse(address);

      res.status(201).json(validatedAddress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getAddresses: (async (req: Request, res: Response) => {
    try {
      const addresses = await AddressModel.getAddresses();
      const validatedAddresses = addressesResponseSchema.parse(addresses);

      res.status(200).json(validatedAddresses);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getAddressById: (async (req: Request, res: Response) => {
    try {
      const address = await AddressModel.getAddressById(req.params.id);

      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
      const validatedAddress = addressResponseSchema.parse(address);

      res.status(200).json(validatedAddress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  updateAddress: (async (req: Request, res: Response) => {
    try {
      const address = await AddressModel.updateAddress(req.params.id, req.body);
      const validatedAddress = addressResponseSchema.parse(address);

      res.status(200).json(validatedAddress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  deleteAddress: (async (req: Request, res: Response) => {
    try {
      const address = await AddressModel.deleteAddress(req.params.id);
      const validatedAddress = addressResponseSchema.parse(address);

      res.status(200).json(validatedAddress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,
};

export default AddressController;
