import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
	provider_id: string;
	date: Date;
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository
	) {}
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
