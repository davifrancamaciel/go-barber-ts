import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/apointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
	public async index(request: Request, response: Response) {
		const { provider_id } = request.params;
		const { month, day, year } = request.body;

		const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);
		const availability = await listProviderDayAvailability.execute({ provider_id, month, day, year });

		return response.json(availability);
	}
}

export default new ProviderDayAvailabilityController();
