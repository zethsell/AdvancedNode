import { Controller, SavePictureController } from '@/application/controllers'
import { Required, RequiredBuffer, AllowedMimeTypes, MaxFileSize } from '@/application/validation'

describe('SaveProfileController', () => {
  let sut: SavePictureController
  let buffer: Buffer
  let mimeType: string
  let userId: string
  let file: { buffer: Buffer, mimeType: string }
  let changeProfilePicture: jest.Mock

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'image/png'
    file = { buffer, mimeType }
    userId = 'any_user_id'
    changeProfilePicture = jest.fn().mockResolvedValue({ initials: 'any_initials', pictureUrl: 'any_url' })
  })

  beforeEach(() => {
    sut = new SavePictureController(changeProfilePicture)
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators({ file, userId })

    expect(validators).toEqual([
      new Required(file, 'file'),
      new RequiredBuffer(buffer, 'file'),
      new AllowedMimeTypes(['png', 'jpg'], mimeType),
      new MaxFileSize(5, buffer)
    ])
  })

  it('should call changeProfilePicture with correct input', async () => {
    await sut.handle({ file, userId })
    expect(changeProfilePicture).toHaveBeenCalledWith({ id: userId, file: buffer })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle({ file, userId })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { initials: 'any_initials', pictureUrl: 'any_url' }
    })
  })

  it('should extend controoler', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
