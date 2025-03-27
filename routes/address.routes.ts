import { Router } from 'express';
import AddressController from '../controllers/address.controller';

const router = Router();

router.post('/', AddressController.createAddress);

router.get('/', AddressController.getAddresses);

router.get('/:id', AddressController.getAddressById);

router.put('/:id', AddressController.updateAddress);

router.delete('/:id', AddressController.deleteAddress);

export default router;
