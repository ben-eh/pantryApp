import express, {Request, Response} from 'express';
import {getAllUsers, authenticateUser} from '../controllers/users'

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/authenticate', authenticateUser);

export default usersRouter;