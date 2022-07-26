import { leaderboardObjType } from '../@types/leaderboard.types';

const leaderboardFactory = (
  awayTeam: leaderboardObjType,
  teamHome: leaderboardObjType,
) => {
  const totalGames = awayTeam.totalGames + teamHome.totalGames;
  const totalPoints = awayTeam.totalPoints + teamHome.totalPoints;

  return {
    name: awayTeam.name,
    totalPoints,
    totalGames,
    totalVictories: awayTeam.totalVictories + teamHome.totalVictories,
    totalDraws: awayTeam.totalDraws + teamHome.totalDraws,
    totalLosses: awayTeam.totalLosses + teamHome.totalLosses,
    goalsFavor: awayTeam.goalsFavor + teamHome.goalsFavor,
    goalsOwn: awayTeam.goalsOwn + teamHome.goalsOwn,
    goalsBalance: awayTeam.goalsBalance + teamHome.goalsBalance,
    efficiency: +((totalPoints / (totalGames * 3)) * 100).toFixed(2),
  };
};

export default leaderboardFactory;
