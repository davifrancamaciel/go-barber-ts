import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

interface Request {
	avatarFilename: string;
	user_id: string;
}

@injectable()
class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) {}

	public async execute({ avatarFilename, user_id }: Request): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('Usuário não autenticado para alterar o avatar', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar);
		}
		
		const fileName = await this.storageProvider.saveFile(avatarFilename)
		user.avatar = fileName;

		await this.usersRepository.update(user);

		// delete user.password;

		return user;
	}
}

export default UpdateUserAvatarService;
