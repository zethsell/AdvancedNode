import { makeJwtTokenGenerator } from '@/main/factories/crypto'
import { makeFacebookApi } from '@/main/factories/api'
import { FacebookAuthenticationService } from '@/data/services'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenGenerator()
  )
}
