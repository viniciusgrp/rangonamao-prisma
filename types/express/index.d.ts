import { Store } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      store?: Store;
    }
  }
}
