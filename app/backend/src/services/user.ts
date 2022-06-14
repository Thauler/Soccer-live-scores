import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/IUser.interfaces';
import JWT from '../utils/jwtSecret';
import UserModel from '../database/models/User';

export default class UserService {
  public model;

  constructor() {
    this.model = UserModel;
  }

  public login = async ({ email, password }: IUser) => {
    const result = await this.model
      .findOne({ where: { email } });

    if (!result?.email) {
      return { code: 401, message: { message: 'Incorrect email or password' } };
    }

    const passwordDecoded = bcrypt.compareSync(password as string, result.password as string);

    if (!passwordDecoded && password.length < 6) {
      return { code: 401, message: { message: 'Incorrect email or password' } };
    }

    return { code: 200, message: { user: result.userAtt, token: JWT.secret(result.role) } };
  };
}
