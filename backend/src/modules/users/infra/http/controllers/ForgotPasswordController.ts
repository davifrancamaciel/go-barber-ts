import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

class ForgotPasswordController {
	public async create(req: Request, response: Response) {
		const { email } = req.body;
		
		const sendForgotPasswordEmailService = container.resolve(SendForgotPasswordEmailService);
		await sendForgotPasswordEmailService.execute({ email });

		return response.status(204).json();
	}
}
export default new ForgotPasswordController();
