import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse } from '@/application/helpers'

type HttpRequest= {file: any}
type Model= Error

class SavePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    return badRequest(new RequiredFieldError('file'))
  }
}

describe('SaveProfileController', () => {
  let sut: SavePictureController

  beforeEach(() => {
    sut = new SavePictureController()
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: undefined })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: null })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })
})
