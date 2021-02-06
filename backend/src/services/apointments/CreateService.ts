import { startOfHour } from 'date-fns';
import Appointment from '../../models/Appointments';
import AppointmentRepository from '../../repositories/AppointmentsRepository';

interface Request {
	provider: string;
	date: Date;
}

class CreateAppointmentService {
	private _appointmentRepository: AppointmentRepository;
	constructor(appointmentRepository: AppointmentRepository) {
		this._appointmentRepository = appointmentRepository;
	}

	public execute({ date, provider }: Request): Appointment {
		const appointmentDate = startOfHour(date);
		const findAppointmemtSameDate = this._appointmentRepository.findByDate(appointmentDate);

		if (findAppointmemtSameDate) {
			throw Error('já existe um agendamento para esta data');
		}
		const ap = this._appointmentRepository.create({ provider, date: appointmentDate });
		return ap;
	}
}

export default CreateAppointmentService;
