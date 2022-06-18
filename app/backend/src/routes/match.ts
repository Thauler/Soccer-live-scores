import { Router } from 'express';
import MatchesController from '../controllers/match';
import MatchesMiddleware from '../middlewares/match';

const routes = Router();

const matchesController = new MatchesController();
const matchesMiddleware = new MatchesMiddleware();

routes.get('/', matchesController.allMatches);
routes.post('/', matchesMiddleware.create, matchesController.create);
routes.patch('/:id/finish', matchesController.update);
routes.patch('/:id', matchesController.updateById);

export default routes;
