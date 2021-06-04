import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
}

@injectable()
class ShowProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	public async execute({ user_id }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('Usuário não autenticado para alterar o avatar', 401);
		}
        
        return user;
	}
}

export default ShowProfileService;
