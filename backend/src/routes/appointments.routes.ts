import { Router } from 'express';

import AppointmentsControler from '../controllers/AppointmentsControler';

const appointmentsRouter = Router();

appointmentsRouter.get('/', AppointmentsControler.index);
appointmentsRouter.post('/', AppointmentsControler.create);

export default appointmentsRouter;
