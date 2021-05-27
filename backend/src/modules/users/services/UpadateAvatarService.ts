import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
	avatarFilename: string;
	user_id: string;
}

@injectable()
class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	public async execute({ avatarFilename, user_id }: Request): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('Usuário não autenticado para alterar o avatar', 401);
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

		await this.usersRepository.update(user);

		// delete user.password;

		return user;
	}
}

export default UpdateUserAvatarService;
