import MatchesModel from '../database/models/Match';

export const winOrLose = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (homeTeamGoals > awayTeamGoals) {
    return 'win';
  }
  if (homeTeamGoals < awayTeamGoals) {
    return 'lose';
  }
  return 'draw';
};

export const pontosPorPartida = (homeTeamGoals: number, awayTeamGoals: number) => {
  if (winOrLose(homeTeamGoals, awayTeamGoals) === 'win') {
    return 3;
  }
  if (winOrLose(homeTeamGoals, awayTeamGoals) === 'draw') {
    return 1;
  }
  return 0;
};

export const totalDePontosHome = (teamTarget: string, matches: MatchesModel[]) => {
  const filtroDenomes = matches.filter(({ teamHome: { teamName } }) => teamName === teamTarget);
  return filtroDenomes
    .reduce((acc, cv) => acc + pontosPorPartida(cv.homeTeamGoals, cv.awayTeamGoals), 0);
};

export const totalDeJogosHome = (teamTarget: string, matches: MatchesModel[]) =>
  matches.filter(({ teamHome: { teamName } }) => teamName === teamTarget).length;

export const calcTotalVictories = (matches: MatchesModel[]) =>
  matches
    .filter(({ homeTeamGoals, awayTeamGoals }) =>
      winOrLose(homeTeamGoals, awayTeamGoals) === 'win').length;

export const calcTotalLosses = (matches: MatchesModel[]) =>
  matches
    .filter(({ homeTeamGoals, awayTeamGoals }) =>
      winOrLose(homeTeamGoals, awayTeamGoals) === 'lose').length;

export const calcTotalDraws = (matches: MatchesModel[]) =>
  matches
    .filter(({ homeTeamGoals, awayTeamGoals }) =>
      winOrLose(homeTeamGoals, awayTeamGoals) === 'draw').length;

export const totalGoasFavor = (teamTarget: string, matches: MatchesModel[]) => {
  const filtroDenomes = matches.filter(({ teamHome: { teamName } }) => teamName === teamTarget);
  return filtroDenomes
    .reduce((acc, cv) => acc + cv.homeTeamGoals, 0);
};

export const totalGoalsOwn = (teamTarget: string, matches: MatchesModel[]) => {
  const filtroDenomes = matches.filter(({ teamHome: { teamName } }) => teamName === teamTarget);
  return filtroDenomes
    .reduce((acc, cv) => acc + cv.awayTeamGoals, 0);
};

export const goalsBalanceCalculator = (teamTarget: string, matches: MatchesModel[]) =>
  totalGoasFavor(teamTarget, matches) - totalGoalsOwn(teamTarget, matches);

const efficiencyCalculator = (teamTarget: string, matches: MatchesModel[]) => {
  const totalDePontos = totalDePontosHome(teamTarget, matches);
  const maxScore = totalDeJogosHome(teamTarget, matches) * 3;
  const efficiencyCalc = (totalDePontos / maxScore) * 100;
  return +efficiencyCalc.toFixed(2);
};

export const leaderboardHomeFactory = (teamName: string, arrayMatches: MatchesModel[]) => {
  const arrayMatchesFiltrado = arrayMatches
    .filter(({ teamHome }) => teamHome.teamName === teamName);
  return {
    name: teamName,
    totalPoints: totalDePontosHome(teamName, arrayMatches),
    totalGames: totalDeJogosHome(teamName, arrayMatches),
    totalVictories: calcTotalVictories(arrayMatchesFiltrado),
    totalDraws: calcTotalDraws(arrayMatchesFiltrado),
    totalLosses: calcTotalLosses(arrayMatchesFiltrado),
    goalsFavor: totalGoasFavor(teamName, arrayMatches),
    goalsOwn: totalGoalsOwn(teamName, arrayMatches),
    goalsBalance: goalsBalanceCalculator(teamName, arrayMatches),
    efficiency: efficiencyCalculator(teamName, arrayMatches),
  };
};
