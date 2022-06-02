import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}
User.init({
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
