import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
	public async findByDate(date: Date, provider_id: string): Promise<Appointment | null> {
		const findAppointmemt = await this.findOne({ where: { date, provider_id } });

		return findAppointmemt || null;
	}
}

export default AppointmentsRepository;
