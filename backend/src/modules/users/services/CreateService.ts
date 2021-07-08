import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/Users'
import IUsersRepository from '../repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
interface Request {
  name: string
  email: string
  password: string
}
@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute ({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Já existe um usuário com este email')
    }
    const hashPassword = await hash(password, 8)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword
    })
    await this.cacheProvider.ivalidatePrefix('providers-list')
    // delete user.password;

    return user
  }
}

export default CreateUserService
