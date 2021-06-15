import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/apointments/services/CreateService';

class AppointmentController {
	public async index(request: Request, response: Response) {
		//const appointments = await _appointmentRepository.find();
		return response.json(null);
	}

	public async create(request: Request, response: Response) {
		const user_id = request.user.id;

		const { provider_id, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointmentService = container.resolve(CreateAppointmentService);
		const ap = await createAppointmentService.execute({ date: parsedDate, provider_id, user_id });

		return response.json(ap);
	}
}

export default new AppointmentController();
