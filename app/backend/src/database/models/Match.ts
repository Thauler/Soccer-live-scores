import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';

export default class Match extends Model {
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}
Match.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.STRING,
    field: 'role',
  },
  homeTeamGoals: {
    type: DataTypes.STRING,
    field: 'role',
  },
  awayTeam: {
    type: DataTypes.STRING,
    field: 'role',
  },
  awayTeamGoals: {
    type: DataTypes.STRING,
    field: 'role',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'role',
  },
}, {
  underscored: true,
  timestamps: false,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
});

Team.hasMany(Match, { foreignKey: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeam' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });
