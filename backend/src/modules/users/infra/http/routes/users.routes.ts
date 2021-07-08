import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import multer from 'multer'
import uploadConfig from '@config/upload'
import UsersControler from '../controllers/UsersControler'
import UpdateControler from '../controllers/UserAvatarControler'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig.multer)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string()
      .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }
  }),
  UsersControler.create
)
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UpdateControler.update
)

export default usersRouter
