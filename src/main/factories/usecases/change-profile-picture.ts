import { makePgUserProfileRepo } from '@/main/factories/repos/pg-user-profile'
import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/usecases'
import { makeAwsS3FileStorage, makeUniqueId } from '@/main/factories/gateways'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(
    makeAwsS3FileStorage(),
    makeUniqueId(),
    makePgUserProfileRepo()
  )
}
