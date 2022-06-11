import { Router } from 'express';
import UserMiddleware from '../middlewares/user';
import UserController from '../controllers/user';

const routes = Router();

const userController = new UserController();
const userMiddleware = new UserMiddleware();

routes.post('/', userMiddleware.login, userController.login);

export default routes;
