import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/apointments/CreateService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
	const appointments = appointmentRepository.all();
	return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
	try {
		const { provider, date } = request.body;

		const parsedDate = parseISO(date);
		const createAppointmentService = new CreateAppointmentService(appointmentRepository);
		const ap = createAppointmentService.execute({ date: parsedDate, provider });

		return response.json(ap);
	} catch (error) {
		return response.status(400).json({ message: error.message });
	}
});

export default appointmentsRouter;
