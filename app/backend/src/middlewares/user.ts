import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user';

export default class UserMiddleware {
  public service;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | undefined> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };
}
