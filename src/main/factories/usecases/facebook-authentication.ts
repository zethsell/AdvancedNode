import { makeJwtTokenHandler, makeFacebookApi } from '@/main/factories/gateways'

import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/usecases'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  )
}
