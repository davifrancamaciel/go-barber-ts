import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import User from '../../models/Users';

import AppError from '../../errors/AppError';

import authConfig from '../../config/auth';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

class AuthenticationUserService {
	public async execute({ email, password }: Request): Promise<Response> {
		const _userRepository = getRepository(User);

		const user = await _userRepository.findOne({ where: { email } });

		if (!user) {
			throw new AppError('Usuário não encontrado', 401);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError('Usuário não encontrado',401);
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
