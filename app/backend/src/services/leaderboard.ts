import TeamsModel from '../database/models/Team';
import MatchesModel from '../database/models/Match';
import { leaderboardHomeFactory } from '../utils/leaderboardHome.factory';

export default class LeaderboardService {
  public modelMatch;

  constructor() {
    this.modelMatch = MatchesModel;
  }

  public allTeamsHome = async () => {
    const match = await this.modelMatch.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      attributes: { exclude: ['id', 'awayTeam', 'homeTeam'] },
    });
    return match;
  };

  leaderboardHome = async () => {
    const matchData = await this.allTeamsHome();

    const teams = new Array(...new Set(matchData.map((a) => a.teamHome.teamName)));
    return teams.map((team) => leaderboardHomeFactory(team, matchData))
      .sort((a, b) =>
        (b.totalPoints - a.totalPoints)
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);
  };
}
