export class user implements UserRepository {
  async addUser (params: UserRepository.Params): Promise<UserRepository.Result> {
    const { user } = params
    const newUser = Object.assign({}, user, { id: '1' }) // Simulando retorno de banco
    return newUser
  }
}

interface UserRepository {
  addUser: (params: UserRepository.Params) => Promise<UserRepository.Result>
}

namespace UserRepository {
  export type Params = {
    user: NewUser
  }

  export type Result = User
}

type User = {
  id: string
  name: string
  email: string
}

type NewUser = {
  name: string
  email: string
}
