import { Request, Response } from 'express';
import TeamsService from '../services/team';

export default class TeamsController {
  public service;

  constructor() {
    this.service = new TeamsService();
  }

  public allTeams = async (req: Request, res: Response) => {
    try {
      const allTeams = await this.service.findAll();
      return res.status(allTeams.code).json(allTeams.message);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public teamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const teamId = await this.service.findByPk(id);

      return res.status(teamId.code).json(teamId.message);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
