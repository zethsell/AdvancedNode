import { UserProfile } from '@/domain/entities'

describe('UserProfile', () => {
  let sut: UserProfile

  beforeEach(() => {
    sut = new UserProfile('any_id')
  })
  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any_url', name: 'any_name' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined
    })
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    const sut = new UserProfile('any_id')
    sut.setPicture({ pictureUrl: 'any_url' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined
    })
  })

  it('should create initials with first letter of first and last name', () => {
    const sut = new UserProfile('any_id')
    sut.setPicture({ name: 'Marcio T Rodrigues' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'MR'
    })
  })

  it('should create initials with first two letters of first name', () => {
    const sut = new UserProfile('any_id')
    sut.setPicture({ name: 'Marcio' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'MA'
    })
  })

  it('should create initials with first letter', () => {
    const sut = new UserProfile('any_id')
    sut.setPicture({ name: 'M' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'M'
    })
  })

  it('should create with empty initials when name and pictureUrl are not provided', () => {
    const sut = new UserProfile('any_id')
    sut.setPicture({ })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined
    })
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ name: '' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined
    })
  })
})
