import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppointmentsControler from '../controllers/AppointmentsControler';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', AppointmentsControler.index);
appointmentsRouter.post('/', AppointmentsControler.create);

export default appointmentsRouter;
