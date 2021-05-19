import { Router } from 'express';

const usersRouter = Router();
import UsersControler from '../controllers/UsersControler';

usersRouter.post('/', UsersControler.create);

export default usersRouter;
