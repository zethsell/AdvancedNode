import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { HttpResponse, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ChangeProfilePicture } from '@/domain/usecases'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.changeProfilePicture({ id: userId, file })
    return ok(data)
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    return [
      ...builder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 })
        .build()
    ]
  }
}
