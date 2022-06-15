import TeamsModel from '../database/models/Team';

export default class TeamsService {
  public model;

  constructor() {
    this.model = TeamsModel;
  }

  public findAll = async () => {
    const allTeams = await this.model.findAll();
    return { code: 200, message: allTeams };
  };

  public findByPk = async (id: string) => {
    const teamById = await this.model.findByPk(id);

    return { code: 200, message: teamById };
  };
}
