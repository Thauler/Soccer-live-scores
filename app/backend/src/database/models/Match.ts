import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamsModel from './Team';

export default class MatchesModel extends Model {
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
  public teamHome: { teamName: string };
  public teamAway: { teamName: string };
}
MatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.STRING,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: DataTypes.STRING,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: DataTypes.STRING,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: DataTypes.STRING,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  timestamps: false,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
});

TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeam' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeam' });

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'teamAway' });
