import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateUserService from '@modules/users/services/CreateService'

class UsersController {
  public async create (request: Request, response: Response) {
    const { name, email, password } = request.body

    const createUserService = container.resolve(CreateUserService)
    const user = await createUserService.execute({ name, email, password })

    return response.json(classToClass(user))
  }
}

export default new UsersController()
