import { Request, Response } from 'express';
import UserService from '../services/user';

export default class UserController {
  public service;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const findOne = await this.service.findOne(req.body);
      return res.status(findOne.code).json(findOne.message);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal server error!' });
    }
  };
}
