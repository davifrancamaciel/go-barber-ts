import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListAppointmentsProviderService from '@modules/apointments/services/ListAppointmentsProviderService';

class Provider {
	public async index(request: Request, response: Response) {
		const provider_id = request.user.id;

		const { day, month, year } = request.body;

		const listAppointmentsProviderService = container.resolve(ListAppointmentsProviderService);
		const ap = await listAppointmentsProviderService.execute({ day, month, year, provider_id });

		return response.json(ap);
	}
}

export default new Provider();
