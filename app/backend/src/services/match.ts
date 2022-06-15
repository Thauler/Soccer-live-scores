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
}
