import { makePgTransactionController } from '@/main/factories/decorators/db-transaction-controller'
import { makeChangeProfilePicture } from '@/main/factories/usecases'
import { SavePictureController, Controller } from '@/application/controllers'

export const makeSavePictureController = (): Controller => {
  const controller = new SavePictureController(makeChangeProfilePicture())
  return makePgTransactionController(controller)
}
