import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Team extends Model {
  public id: number;

  public teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    field: 'team_name',
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});
