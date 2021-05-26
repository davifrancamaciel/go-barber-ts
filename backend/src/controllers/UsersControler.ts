import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateService';
import UpdateUserAvatarService from '@modules/users/services/UpadateAvatarService';

class AppointmentController {
	public async create(request: Request, response: Response) {
		const { name, email, password } = request.body;

		const createUserService = new CreateUserService();
		const user = await createUserService.execute({ name, email, password });

		return response.json(user);
	}

	public async updateAvatar(request: Request, response: Response) {
		const updateUserAvatarService = new UpdateUserAvatarService();
		const user = await updateUserAvatarService.execute({
			avatarFilename: request.file.filename,
			user_id: request.user.id,
		});

		return response.json(user);
	}
}

export default new AppointmentController();
