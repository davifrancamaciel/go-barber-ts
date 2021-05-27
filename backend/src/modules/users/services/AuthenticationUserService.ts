import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

@injectable()
class AuthenticationUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	public async execute({ email, password }: Request): Promise<Response> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Usuário não encontrado', 401);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError('Usuário não encontrado', 401);
		}

		const { secret, expiresIn } = authConfig.jwt;

		//delete user.password;

		const token = sign({ name: user.name, email: user.email }, secret, {
			subject: user.id,
			expiresIn,
		});
		return { user, token };
	}
}

export default AuthenticationUserService;
