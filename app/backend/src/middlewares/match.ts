import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/team';

export default class MatchesMiddleware {
  public service;

  constructor() {
    this.service = new TeamsService();
  }

  public create = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const resultHome = await this.service.findByPk(homeTeam);
    const resultAway = await this.service.findByPk(awayTeam);
    if (!resultHome.message?.id || !resultAway.message?.id) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  };
}
