import { Request, Response } from 'express';
import MatchesService from '../services/match';

const SERVER_ERROR = { message: 'Internal Server Error' };
export default class MatchesController {
  public service;

  constructor() {
    this.service = new MatchesService();
  }

  public allMatches = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      const allMatches = await this.service.getAllAndQuery(inProgress as string);
      return res.status(allMatches.code).json(allMatches.message);
    } catch (e) {
      console.log(e);
      return res.status(500).json(SERVER_ERROR);
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const result = await this.service.create(req.body);
      return res.status(result.code).json(result.message);
    } catch (e) {
      console.log(e);
      return res.status(500).json(SERVER_ERROR);
    }
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.service.update(id);
      return res.status(result.code).json(result.message);
    } catch (e) {
      console.log(e);
      return res.status(500).json(SERVER_ERROR);
    }
  };
}
