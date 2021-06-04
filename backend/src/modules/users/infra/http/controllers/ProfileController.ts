import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpadateProfileService from '@modules/users/services/UpadateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
	public async show(request: Request, response: Response) {
		const showProfileService = container.resolve(ShowProfileService);
		const user = await showProfileService.execute({
			user_id: request.user.id,
		});

		return response.json(user);
	}

	public async update(request: Request, response: Response) {
		const { name, email, password, old_password } = request.body;

		const upadateProfileService = container.resolve(UpadateProfileService);
		const user = await upadateProfileService.execute({
			name,
			email,
			password,
			old_password,
			user_id: request.user.id,
		});

		return response.json(user);
	}
}

export default new ProfileController();
