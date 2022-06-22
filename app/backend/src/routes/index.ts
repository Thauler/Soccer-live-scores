import { Router } from 'express';
import userRoute from './user';
import teamsRoute from './team';
import matchesRoute from './match';
import leaderboardsRoute from './leaderboard';

const routes = Router();

routes.use('/login', userRoute);
routes.use('/teams', teamsRoute);
routes.use('/matches', matchesRoute);
routes.use('/leaderboard', leaderboardsRoute);

export default routes;
