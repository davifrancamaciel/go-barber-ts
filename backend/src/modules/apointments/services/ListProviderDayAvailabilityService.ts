import { injectable, inject } from 'tsyringe';
import { isAfter, getHours } from 'date-fns';

import IAppointmentsRepository from '@modules/apointments/repositories/IAppointmentsRepository';
//import Appointment from '../infra/typeorm/entities/Appointments';

interface IRequest {
	provider_id: string;
	month: number;
	year: number;
	day: number;
}
type IResponse = Array<{
	hour: number;
	available: boolean;
	//appointment: Appointment | undefined;
}>;

@injectable()
class ListProviderDayAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository
	) {}

	public async execute({ provider_id, month, year, day }: IRequest): Promise<IResponse> {
		const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
			provider_id,
			month,
			year,
			day,
		});

		const hourStart = 8;
		const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart);

		const currentDate = new Date(Date.now());

		const availability = eachHourArray.map((hour) => {
			const hasAppoitmentInHour = appointments.find((appointment) => getHours(appointment.date) === hour);

			const compareDate = new Date(year, month - 1, day, hour);

			return {
				hour,
				available: !hasAppoitmentInHour && isAfter(compareDate, currentDate),
				// appointment: hasAppoitmentInHour,
			};
		});
		return availability;
	}
}

export default ListProviderDayAvailabilityService;
