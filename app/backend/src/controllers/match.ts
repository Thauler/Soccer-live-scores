import { Request, Response } from 'express';
import MatchesService from '../services/match';

export default class MatchesController {
  public service;

  constructor() {
    this.service = new MatchesService();
  }

  public allMatches = async (req: Request, res: Response) => {
    try {
      const allMatches = await this.service.findAll();
      return res.status(allMatches.code).json(allMatches.message);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
