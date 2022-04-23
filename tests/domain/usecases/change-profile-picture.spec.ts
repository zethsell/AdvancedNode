import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'
import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'jest-mock'

jest.mock('@/domain/entities/user-profile')

describe('Change profile picture', () => {
  let uuid: string
  let file: Buffer
  let fileStorage: MockProxy<UploadFile & DeleteFile>
  let crypto: MockProxy<UUIDGenerator>
  let userProfileRepo: MockProxy<SaveUserPicture & LoadUserProfile>
  let sut: ChangeProfilePicture

  beforeAll(() => {
    uuid = 'any_unique_id'
    file = Buffer.from('any_buffer')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_url')
    userProfileRepo = mock()
    userProfileRepo.load.mockResolvedValue({ name: 'Marcio T Rodrigues' })
    crypto = mock()
    crypto.uuid.mockReturnValue(uuid)
  })

  beforeEach(() => {
    sut = setupChangeProfilePicture(fileStorage, crypto, userProfileRepo)
  })

  it('should call uploadFile with correct input', async () => {
    await sut({ id: 'any_id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should not call uploadFile when file undefined', async () => {
    await sut({ id: 'any_id', file: undefined })

    expect(fileStorage.upload).not.toHaveBeenCalled()
  })

  it('should call LoadUserPicture with correct input', async () => {
    await sut({ id: 'any_id', file: undefined })

    expect(userProfileRepo.load).toHaveBeenCalledWith({ id: 'any_id' })
    expect(userProfileRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should not call LoadUserPicture if file exists', async () => {
    await sut({ id: 'any_id', file })

    expect(userProfileRepo.load).not.toHaveBeenCalled()
  })

  it('should not call SaveUserPicture with correct input', async () => {
    await sut({ id: 'any_id', file })

    expect(userProfileRepo.load).not.toHaveBeenCalledWith(...mocked(UserProfile).mock.instances)
    expect(userProfileRepo.load).not.toHaveBeenCalledTimes(1)
  })

  it('should not call SaveUserPicture with correct input', async () => {
    userProfileRepo.load.mockResolvedValue(undefined)
    await sut({ id: 'any_id', file })

    expect(userProfileRepo.load).not.toHaveBeenCalledWith(...mocked(UserProfile).mock.instances)
    expect(userProfileRepo.load).not.toHaveBeenCalledTimes(1)
  })

  it('should return correct data on success', async () => {
    mocked(UserProfile).mockImplementationOnce(id => ({
      setPicture: jest.fn(),
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: 'any_initials'
    }))

    const result = await sut({ id: 'any_id', file })

    expect(result).toMatchObject({
      pictureUrl: 'any_url',
      initials: 'any_initials'
    })
  })

  it('should call DeleteFile when file exists and SaveUserPicture throws', async () => {
    userProfileRepo.savePicture.mockRejectedValueOnce(new Error())

    const promise = sut({ id: 'any_id', file })

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ key: uuid })
      expect(fileStorage.delete).toHaveBeenCalledTimes(1)
    })
  })

  it('should not call DeleteFile when file does not exists and SaveUserPicture throws', async () => {
    userProfileRepo.savePicture.mockRejectedValueOnce(new Error())

    const promise = sut({ id: 'any_id', file: undefined })

    promise.catch(() => {
      expect(fileStorage.delete).not.toHaveBeenCalledWith({ key: uuid })
    })
  })

  it('should rethrow if SaveUserPicture throws', async () => {
    const error = new Error('save_error')
    userProfileRepo.savePicture.mockRejectedValueOnce(error)

    const promise = sut({ id: 'any_id', file: undefined })

    await expect(promise).rejects.toThrow(error)
  })
})
