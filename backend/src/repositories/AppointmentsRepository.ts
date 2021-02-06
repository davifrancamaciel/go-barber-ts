import { isEqual } from 'date-fns';

import Appointment from '../models/Appointments';

interface CreateAppointmentDTO {
	provider: string;
	date: Date;
}

class AppointmentsRepository {
	private appointments: Appointment[];

	constructor() {
		this.appointments = [];
	}

	public all(): Appointment[] {
		return this.appointments;
	}

	public findByDate(date: Date): Appointment | null {
		const findAppointmemt = this.appointments.find((appointment) => isEqual(date, appointment.date));

		return findAppointmemt || null;
	}

	public create({ provider, date }: CreateAppointmentDTO): Appointment {
		const ap = new Appointment({provider, date});
		this.appointments.push(ap);

		return ap;
	}
}

export default AppointmentsRepository;
