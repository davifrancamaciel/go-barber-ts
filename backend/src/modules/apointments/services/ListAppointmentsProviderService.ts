import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/apointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointments';

interface IRequest {
	provider_id: string;
	month: number;
	year: number;
	day: number;
}

@injectable()
class ListAppointmentsProviderService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository
	) {}

	public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {
		const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
			provider_id,
			month,
			year,
			day,
		});

		return appointments;
	}
}

export default ListAppointmentsProviderService;