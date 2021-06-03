import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
	public async create(req: Request, response: Response) {
		const { token, password } = req.body;

		const resetPasswordService = container.resolve(ResetPasswordService);
		await resetPasswordService.execute({ token, password });

		return response.status(200).json();
	}
}
export default new ResetPasswordController();
