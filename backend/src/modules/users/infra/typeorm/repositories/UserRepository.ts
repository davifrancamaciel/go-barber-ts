import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;
	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async findAllProviders(data: IFindAllProvidersDTO): Promise<User[]> {
		let users: User[];

		if (data.except_user_id) {
			users = await this.ormRepository.find({
				where: {
					id: Not(data.except_user_id),
				},
			});
		} else {
			users = await this.ormRepository.find();
		}

		return users;
	}

	public async findById(id: string): Promise<User | null> {
		const user = await this.ormRepository.findOne(id);

		return user || null;
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user = await this.ormRepository.findOne({ where: { email } });

		return user || null;
	}

	public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({ name, email, password });

		await this.ormRepository.save(user);

		return user;
	}

	public async update(user: User): Promise<User> {
		return await this.ormRepository.save(user);
	}
}

export default UsersRepository;
