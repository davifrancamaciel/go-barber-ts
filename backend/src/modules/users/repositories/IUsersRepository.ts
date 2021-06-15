import User from '../infra/typeorm/entities/Users';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO'

export default interface IUsersRepository {
	findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;

	findByEmail(email: string): Promise<User | null>;

	findById(id: string): Promise<User | null>;

	create(data: ICreateUserDTO): Promise<User>;

	update(data: User): Promise<User>;
}
