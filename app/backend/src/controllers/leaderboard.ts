import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard';

export default class LeaderboadController {
  public service;

  constructor() {
    this.service = new LeaderboardService();
  }

  public leaderboardHome = async (req: Request, res: Response) => {
    try {
      const result = await this.service.leaderboardHome();
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.status(500).json('Internal Server Error');
    }
  };

  public leaderboardAway = async (req: Request, res: Response) => {
    try {
      const result = await this.service.leaderboardAway();
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.status(500).json('Internal Server Error');
    }
  };
}
