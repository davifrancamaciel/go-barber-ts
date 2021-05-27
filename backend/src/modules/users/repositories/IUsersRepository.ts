import User from '../infra/typeorm/entities/Users';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>;

	findById(id: string): Promise<User | null>;

	create(data: ICreateUserDTO): Promise<User>;

	update(data: User): Promise<User>;
}
