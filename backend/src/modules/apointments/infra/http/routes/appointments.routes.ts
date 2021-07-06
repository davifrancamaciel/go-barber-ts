import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppointmentsControler from '../controllers/AppointmentsControler'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', AppointmentsControler.index)
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string()
        .uuid()
        .required(),
      date: Joi.date()
    }
  }),
  AppointmentsControler.create
)
appointmentsRouter.get('/me', ProviderAppointmentsController.index)

export default appointmentsRouter
