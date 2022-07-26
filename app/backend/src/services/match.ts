import { IMatch } from '../@types/IMatch.types';
import TeamsModel from '../database/models/Team';
import MatchesModel from '../database/models/Match';

export default class MatchesService {
  public model;

  constructor() {
    this.model = MatchesModel;
  }

  public findAll = async () => {
    const result = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: 200, message: result };
  };

  public queryInProgress = async () => {
    const result = await this.model.findAll({
      where: { inProgress: true },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: 200, message: result };
  };

  public queryNotInProgress = async () => {
    const result = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: 200, message: result };
  };

  public getAllAndQuery = async (inProgress: string) => {
    if (inProgress === 'true') {
      return this.queryInProgress();
    }
    if (inProgress === 'false') {
      return this.queryNotInProgress();
    }
    return this.findAll();
  };

  public create = async (body: IMatch) => {
    const result = await this.model.create(body);
    return { code: 201, message: result };
  };

  public update = async (id: string) => {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { code: 200, message: { message: 'Finished' } };
  };

  public updateById = async (id: string, homeGoals: number, awayGoals: number) => {
    await this.model
      .update({ homeTeamGoals: homeGoals, awayTeamGoals: awayGoals }, { where: { id } });
    return { code: 200, message: { message: 'The score has been updated' } };
  };
}
