import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './team';

export default class Match extends Model {
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}
Match.init({
  homeTeam: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  timestamps: false,
  sequelize: db,
  modelName: 'Match',
});

Team.hasMany(Match, { foreignKey: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeam' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });
