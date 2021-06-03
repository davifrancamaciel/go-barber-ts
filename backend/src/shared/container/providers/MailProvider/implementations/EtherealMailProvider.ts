import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

interface IMessage {
	to: string;
	body: string;
}

export default class EtherealMailProvider implements IMailProvider {
	private client: Transporter;
	constructor() {
		nodemailer.createTestAccount().then((account) => {
			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass,
				},
			});
			this.client = transporter;
		});
	}

	public async senMail(to: string, body: string): Promise<void> {
		
		const message = await this.client.sendMail({
			from: 'Equipe GoBarber <contato@gobarber.com.br>',
			to,
			subject: 'Recuperação de senha',
			text: body,
		});

		console.log('Message sent: %s', message.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}