import { Request, Response } from 'express';

import AuthenticationUserService from '../services/sessions/AuthenticationUserService';

class SessionsController {
	public async create(req: Request, response: Response) {
		try {
			const { email, password } = req.body;

			const authenticateUser = new AuthenticationUserService();
			const { user, token } = await authenticateUser.execute({ email, password });

			return response.json({ user, token });
		} catch (error) {
			return response.status(400).json({ message: error.message });
		}
	}
}
export default new SessionsController();
