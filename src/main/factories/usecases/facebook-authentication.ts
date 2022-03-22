import { makeJwtTokenHandler } from '@/main/factories/crypto'
import { makeFacebookApi } from '@/main/factories/api'
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/usecases'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  )
}
