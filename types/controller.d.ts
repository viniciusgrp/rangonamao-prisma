import { Request, Response } from 'express';
import { AuthenticatedRequest } from './middleware';

export type ControllerFunction = (
  req: Request | AuthenticatedRequest,
  res: Response
) => Promise<void> | void; 