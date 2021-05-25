import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../../models/Appointments';
import AppointmentRepository from '../../repositories/AppointmentsRepository';
import AppError from '../../errors/AppError';

interface Request {
	provider_id: string;
	date: Date;
}

class CreateAppointmentService {
	public async execute({ date, provider_id }: Request): Promise<Appointment> {
		const _appointmentRepository = getCustomRepository(AppointmentRepository);
		const appointmentDate = startOfHour(date);
		const findAppointmemtSameDate = await _appointmentRepository.findByDate(appointmentDate, provider_id);

		if (findAppointmemtSameDate) {
			throw new AppError('já existe um agendamento para esta data');
		}
		// cria a instancia
		const ap = _appointmentRepository.create({ provider_id, date: appointmentDate });
		// salva no banco
		await _appointmentRepository.save(ap);
		return ap;
	}
}

export default CreateAppointmentService;
