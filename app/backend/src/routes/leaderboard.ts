import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard';

const routes = Router();

const leaderboardController = new LeaderboardController();

routes.get('/home', leaderboardController.leaderboardHome);
routes.get('/away', leaderboardController.leaderboardAway);

export default routes;
