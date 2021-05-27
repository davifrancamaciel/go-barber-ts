import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/apointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointments';
import ICreateAppointmentDTO from '@modules/apointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: Repository<Appointment>;
	constructor() {
		this.ormRepository = getRepository(Appointment);
	}
	public async findByDate(date: Date, provider_id: string): Promise<Appointment | null> {
		const findAppointmemt = await this.ormRepository.findOne({ where: { date, provider_id } });

		return findAppointmemt || null;
	}

	public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({ provider_id, date });
		
		await this.ormRepository.save(appointment);
		
		return appointment;
	}
}

export default AppointmentsRepository;
