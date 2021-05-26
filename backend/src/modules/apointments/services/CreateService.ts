import { startOfHour } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import IAppointementsRepository from '../repositories/IAppointementsRepository';

interface Request {
	provider_id: string;
	date: Date;
}

class CreateAppointmentService {
	constructor(private appointmentsRepository: IAppointementsRepository) {}
	public async execute({ date, provider_id }: Request): Promise<Appointment> {
		const appointmentDate = startOfHour(date);
		const findAppointmemtSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

		if (findAppointmemtSameDate) {
			throw new AppError('já existe um agendamento para esta data');
		}

		const ap = await this.appointmentsRepository.create({ provider_id, date: appointmentDate });

		return ap;
	}
}

export default CreateAppointmentService;
