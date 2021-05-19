import { Request, Response } from 'express';

import CreateUserService from '../services/users/CreateService';

class AppointmentController {
	public async create(request: Request, response: Response) {
		try {
			const { name, email, password } = request.body;

			const createUserService = new CreateUserService();
			const user = await createUserService.execute({ name, email, password });

			return response.json(user);
		} catch (error) {
			return response.status(400).json({ message: error.message });
		}
	}
}

export default new AppointmentController();
