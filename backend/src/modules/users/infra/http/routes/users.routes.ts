import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersControler from '../controllers/UsersControler';
import UpdateControler from '../controllers/UserAvatarControler';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UsersControler.create);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), UpdateControler.update);

export default usersRouter;
