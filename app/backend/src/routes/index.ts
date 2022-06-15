import { Router } from 'express';
import userRoute from './user';
import teamsRoute from './team';

const routes = Router();

routes.use('/login', userRoute);
routes.use('/teams', teamsRoute);

export default routes;
