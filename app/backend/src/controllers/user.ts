import { Request, Response } from 'express';
import UserService from '../services/user';

export default class UserController {
  public service;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email } = req.body;
      const findOne = await this.service.findOne(email);
      console.log(findOne);
      return res.status(200).json(findOne);
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  };
}
