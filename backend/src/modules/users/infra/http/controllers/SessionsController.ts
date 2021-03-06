import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService'

class SessionsController {
  public async create (req: Request, response: Response) {
    const { email, password } = req.body

    const authenticateUser = container.resolve(AuthenticationUserService)
    const { user, token } = await authenticateUser.execute({ email, password })

    return response.json({ user: classToClass(user), token })
  }
}
export default new SessionsController()
