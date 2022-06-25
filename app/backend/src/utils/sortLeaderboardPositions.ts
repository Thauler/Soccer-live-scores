import { leaderboardObjType } from '../@types/leaderboard.types';
import MatchesModel from '../database/models/Match';

const sortPosition = (teams: string[], matches: MatchesModel[], factory: leaderboardObjType[]) =>
  factory.sort((a, b) =>
    (b.totalPoints - a.totalPoints)
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);

export default sortPosition;
