import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/Users'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  user_id: string
}

@injectable()
class ListProviderService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute ({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    )

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      })
      console.log('fez a query')
      this.cacheProvider.save(
        `providers-list:${user_id}`,
        JSON.stringify(users)
      )
    }

    return users
  }
}

export default ListProviderService
