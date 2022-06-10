// import { IUser } from '../interfaces/IUser.interfaces';
import JWT from '../utils/jwtSecret';
import UserModel from '../database/models/User';

export default class UserService {
  public model;

  constructor() {
    this.model = UserModel;
  }

  public findOne = async (email: string) => {
    const result = await this.model
      .findOne({ where: { email }, attributes: { exclude: ['password'] } });
    return { user: result?.toJSON(), token: JWT.secret(result?.email) };
  };
}
