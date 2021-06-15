import { getRepository, Repository, Raw, Between } from 'typeorm';
//import { startOfDay, endOfDay, parseISO } from 'date-fns';

import IAppointmentsRepository from '@modules/apointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointments';
import ICreateAppointmentDTO from '@modules/apointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/apointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/apointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: Repository<Appointment>;
	constructor() {
		this.ormRepository = getRepository(Appointment);
	}
	public async findByDate(date: Date, provider_id: string): Promise<Appointment | null> {
		const findAppointmemt = await this.ormRepository.findOne({ where: { date, provider_id } });

		return findAppointmemt || null;
	}

	public async findAllInMonthFromProvider({
		provider_id,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
		const parsedMont = String(month).padStart(2, '0');

		const appointments = await this.ormRepository.find({
			where: {
				provider_id,
				date: Raw((dateFieldName) => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMont}-${year}'`),
			},
		});
		
		return appointments;
	}

	public async findAllInDayFromProvider({
		provider_id,
		month,
		year,
		day,
	}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
		const parsedDay = String(day).padStart(2, '0');
		const parsedMonth = String(month).padStart(2, '0');
		// const parsedDate = parseISO(`${year}-${parsedMonth}-${parsedDay}`);
		// const startDate = startOfDay(parsedDate);
		// const endDate = endOfDay(parsedDate);

		const appointments = await this.ormRepository.find({
			where: {
				provider_id,
				// date: Between(startDate, endDate),
				date: Raw(
					(dateFieldName) => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
				),
			},
		});

		return appointments;
	}

	public async create({ user_id, provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({ user_id, provider_id, date });

		await this.ormRepository.save(appointment);

		return appointment;
	}
}

export default AppointmentsRepository;
