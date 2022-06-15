import { Router } from 'express';
import TeamsController from '../controllers/team';

const routes = Router();

const teamsController = new TeamsController();

routes.get('/', teamsController.allTeams);
routes.get('/:id', teamsController.teamById);

export default routes;
