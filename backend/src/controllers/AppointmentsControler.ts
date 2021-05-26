import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/apointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/apointments/services/CreateService';

const appointmentRepository = new AppointmentRepository();
class AppointmentController {
	public async index(request: Request, response: Response) {
		
		//const appointments = await _appointmentRepository.find();
		return response.json(null);
	}

	public async create(request: Request, response: Response) {
		const { provider_id, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointmentService = new CreateAppointmentService(appointmentRepository);
		const ap = await createAppointmentService.execute({ date: parsedDate, provider_id });

		return response.json(ap);
	}
}

export default new AppointmentController();
