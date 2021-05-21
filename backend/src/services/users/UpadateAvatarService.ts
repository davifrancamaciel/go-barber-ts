import path from 'path';
import fs from 'fs';

import { getRepository } from 'typeorm';
import User from '../../models/Users';
import uploadConfig from '../../config/upload';

interface Request {
	avatarFilename: string;
	user_id: string;
}

class UpdateUserAvatarService {
	public async execute({ avatarFilename, user_id }: Request): Promise<User> {
		const _userRepository = getRepository(User);

		const user = (await _userRepository.findOne(user_id)) as User;

		if (!user) {
			throw new Error('Usuário não autenticado para alterar o avatar');
		}

		if (user.avatar) {
			// deletar avatar antigo
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
			const avatarFileExists = await fs.promises.stat(userAvatarFilePath);
			if (avatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}
		user.avatar = avatarFilename;

		await _userRepository.save(user);

		// delete user.password;

		return user;
	}
}

export default UpdateUserAvatarService;