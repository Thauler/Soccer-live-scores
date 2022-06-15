import { Request, Response } from 'express';
import { RequestWithUserRole } from '../@types/request.types';
import UserService from '../services/user';

export default class UserController {
  public service;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const findOne = await this.service.login(req.body);
      return res.status(findOne.code).json(findOne.message);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal server error!' });
    }
  };

  public authToken = (req: RequestWithUserRole, res: Response) => {
    const role = req.dataRole?.data;
    try {
      return res.status(200).json(role);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal server error!' });
    }
  };
}
