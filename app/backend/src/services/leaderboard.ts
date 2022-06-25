import { leaderboardAwayFactory } from '../utils/leaderboardAway.factory';
import TeamsModel from '../database/models/Team';
import MatchesModel from '../database/models/Match';
import { leaderboardHomeFactory } from '../utils/leaderboardHome.factory';
import sortPosition from '../utils/sortLeaderboardPositions';

export default class LeaderboardService {
  public modelMatch;

  constructor() {
    this.modelMatch = MatchesModel;
  }

  public allTeams = async () => {
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
    const matchData = await this.allTeams();

    const teamsHome = new Array(...new Set(matchData.map((a) => a.teamHome.teamName)));
    const factoryHome = teamsHome.map((team) => leaderboardHomeFactory(team, matchData));

    return sortPosition(teamsHome, matchData, factoryHome);
  };

  leaderboardAway = async () => {
    const matchData = await this.allTeams();

    const teamsAway = new Array(...new Set(matchData.map((a) => a.teamAway.teamName)));
    const factoryAway = teamsAway.map((team) => leaderboardAwayFactory(team, matchData));

    return sortPosition(teamsAway, matchData, factoryAway);
  };
}
