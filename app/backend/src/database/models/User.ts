import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class UserModel extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password?: string;

  get userAtt() {
    return {
      id: this.id,
      username: this.username,
      role: this.role,
      email: this.email,
    };
  }
}
UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    field: 'username',
  },
  role: {
    type: DataTypes.STRING,
    field: 'role',
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
  },
  password: {
    type: DataTypes.STRING,
    field: 'password',
  },
}, {
  timestamps: false,
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
});
