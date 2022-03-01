import { AuthenticationError } from '@/domain/errors/authentication'
import { AccessToken } from '@/domain/models/access-token'
export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
