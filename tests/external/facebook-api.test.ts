import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('', () => {
  let sut: FacebookApi
  let axiosClient: AxiosHttpClient

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })
  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAHKu5r7vPIBAB9hfsNTEiVJoLZBjGiVlQUdn3msx0ZAvHZAwfL46wT4CZAZCntfb0GwIBNZCzVzFzVi5P1Ix8G9tZCdjWZBbsbVJuOwtaPZBMhscolZCivMLlOeB99KSMXBdp8Rf3Uyvc2TDZCnkNtnmTzXCwRTLqO6xF5zZCAmyWDZBDE0ZBxKNlJxXGsxvpZAiffnGDnoe4miL6q9gZDZD' })

    expect(fbUser).toEqual({
      facebookId: '105242485459312',
      email: 'zeth_hhkywhm_testes@tfbnw.net',
      name: 'Zeth testes'
    })
  })

  it('should return undefined Facebook User if token is invalid', async () => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
