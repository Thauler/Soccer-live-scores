import TeamsModel from '../database/models/Team';

export default class TeamsService {
  public model;

  constructor() {
    this.model = TeamsModel;
  }

  public findAll = async () => {
    const allTeams = await this.model.findAll();
    return allTeams;
  };

  public findByPk = async (id: string) => {
    const teamById = await this.model.findByPk(id);
    console.log(teamById);

    return teamById;
  };
}
