import { Router } from 'express';
import MatchesController from '../controllers/match';

const routes = Router();

const matchesController = new MatchesController();

routes.get('/', matchesController.allMatches);

export default routes;
