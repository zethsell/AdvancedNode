import { InvalidMymeTypeError } from '@/application/errors'

type Extension = 'png' | 'jpg'

class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimeType: string
  ) {}

  validate (): Error {
    return new InvalidMymeTypeError(this.allowed)
  }
}

describe('AllowedMimeTypes', () => {
  it('should return InvalidMymeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMymeTypeError(['png']))
  })
})
