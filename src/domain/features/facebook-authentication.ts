import { AuthenticationError } from '@/domain/entities/errors/authentication'
import { AccessToken } from '@/domain/entities/access-token'
export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
