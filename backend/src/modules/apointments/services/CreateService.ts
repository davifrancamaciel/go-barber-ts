import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
	provider_id: string;
	user_id: string;
	date: Date;
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository
	) {}
	public async execute({ date, user_id, provider_id }: Request): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError('Não é possível agendar para datas retroativas');
		}

		if (user_id === provider_id) {
			throw new AppError('Não é possível realizar um agendamento consigo mesmo');
		}

		if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
			throw new AppError('São permitidos agendamentos somente entre as 8:00 e às 17:00h');
		}

		const findAppointmemtSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

		if (findAppointmemtSameDate) {
			throw new AppError('já existe um agendamento para esta data');
		}

		const ap = await this.appointmentsRepository.create({ user_id, provider_id, date: appointmentDate });

		return ap;
	}
}

export default CreateAppointmentService;
