import { FacebookApi, HttpGetClient } from '@/infra/gateways'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookApi', () => {
  let clientId: string
  let clientSecret: string
  let sut: FacebookApi
  let httpClient: MockProxy<HttpGetClient>

  beforeAll(() => {
    clientId = 'any_client_id'
    clientSecret = 'any_client_secret'
    httpClient = mock()
  })

  beforeEach(() => {
    httpClient.get.mockResolvedValueOnce({ access_token: 'any_app_token' })
    httpClient.get.mockResolvedValueOnce({ data: { user_id: 'any_user_id' } })
    httpClient.get.mockResolvedValueOnce({
      id: 'any_fb_id',
      name: 'any_fb_name',
      email: 'any_fb_email'
    })

    sut = new FacebookApi(httpClient, clientId, clientSecret)
  })

  it('should get app token', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
  })

  it('should get debug token', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/debug_token',
      params: {
        access_token: 'any_app_token',
        input_token: 'any_client_token'
      }
    })
  })

  it('should get user info', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/any_user_id',
      params: {
        fields: 'id,name,email',
        access_token: 'any_client_token'
      }
    })
  })

  it('should return facebook user', async () => {
    const fbuser = await sut.loadUser({ token: 'any_client_token' })

    expect(fbuser).toEqual({
      facebookId: 'any_fb_id',
      name: 'any_fb_name',
      email: 'any_fb_email'
    })
  })

  it('should return undefined if HttpGetClient throws', async () => {
    httpClient.get.mockReset().mockRejectedValueOnce(new Error('facebook_error'))

    const fbuser = await sut.loadUser({ token: 'any_client_token' })

    expect(fbuser).toBeUndefined()
  })
})