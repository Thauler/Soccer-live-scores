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
}
