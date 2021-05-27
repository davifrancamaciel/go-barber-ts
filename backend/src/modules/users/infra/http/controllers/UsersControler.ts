import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateService';

class UsersController {
	public async create(request: Request, response: Response) {
		const { name, email, password } = request.body;

		const createUserService = container.resolve(CreateUserService);
		const user = await createUserService.execute({ name, email, password });

		return response.json(user);
	}
}

export default new UsersController();
