import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UsersControler from '../controllers/UsersControler';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UsersControler.create);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), UsersControler.updateAvatar);

export default usersRouter;
