import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/apointments/CreateService';
import Appointment from '../models/Appointments';

class AppointmentController {
	public async index(request: Request, response: Response) {
		const _appointmentRepository = getCustomRepository(AppointmentRepository);
		const appointments = await _appointmentRepository.find();
		return response.json(appointments);
	}

	public async create(request: Request, response: Response) {
		const { provider_id, date } = request.body;

		const parsedDate = parseISO(date);

		const createAppointmentService = new CreateAppointmentService();
		const ap = await createAppointmentService.execute({ date: parsedDate, provider_id });

		return response.json(ap);
	}
}

export default new AppointmentController();
