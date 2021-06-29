import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsControler from '../controllers/AppointmentsControler';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', AppointmentsControler.index);
appointmentsRouter.post('/', AppointmentsControler.create);
appointmentsRouter.get('/me', ProviderAppointmentsController.index);

export default appointmentsRouter;
