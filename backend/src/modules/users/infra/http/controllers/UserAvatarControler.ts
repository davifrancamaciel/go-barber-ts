import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpadateAvatarService';

class UserAvatarController {
	public async update(request: Request, response: Response) {
		const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

		const user = await updateUserAvatarService.execute({
			avatarFilename: request.file.filename,
			user_id: request.user.id,
		});

		return response.json(user);
	}
}

export default new UserAvatarController();
