import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface Request {
	email: string;
}
@injectable()
class SendForgotPasswordEmailService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('UserTokenRepository')
		private userTokenRepository: IUserTokenRepository
	) {}

	public async execute({ email }: Request): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Usuario não existe');
		}

		const { token } = await this.userTokenRepository.generate(user.id);
		await this.mailProvider.senMail(email, `Pedido de recuperação de senha recebido ${token}`);
	}
}

export default SendForgotPasswordEmailService;
