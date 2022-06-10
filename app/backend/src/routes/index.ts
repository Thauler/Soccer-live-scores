import { Router } from 'express';
import userRoute from './user';

const routes = Router();

routes.use('/login', userRoute);

export default routes;
