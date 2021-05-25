import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/Users';
import AppError from '../../errors/AppError';

interface Request {
	name: string;
	email: string;
	password: string;
}
class CreateUserService {
	public async execute({ name, email, password }: Request): Promise<User> {
		const _userRepository = getRepository(User);

		const checkUserExists = await _userRepository.findOne({ where: { email } });

		if (checkUserExists) {
			throw new AppError('Já existe um usuário com este email');
		}
		const hashPassword = await hash(password, 8);
		const user = _userRepository.create({ name, email, password: hashPassword });
        
        await _userRepository.save(user);
        
        // delete user.password;

		return user;
	}
}

export default CreateUserService;
