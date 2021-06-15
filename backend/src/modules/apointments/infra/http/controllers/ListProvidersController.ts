import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/apointments/services/ListProvidersService';

class ProviderController {
	public async index(request: Request, response: Response) {
		const user_id = request.user.id;

		const listProvidersService = container.resolve(ListProvidersService);
		const providers = await listProvidersService.execute({ user_id });

		return response.json(providers);
	}
}

export default new ProviderController();
