import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('', () => {
  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
    const fbUser = await sut.loadUser({ token: 'EAAHKu5r7vPIBAAhRU0qk8FhvZBA5nGsmnYa8kTnRKmKZAJxKCeGdDLkilNzmScXmrzZCAvz65ZCK6TSyZBdttc28TZAQYHejT28E61e1Xc3PIZAiI51ZBYylZAZBwsjLWZCiSHlSCwadqP24H9L0k9LWMbzSOPo35rXWxjqZAJebj9RenLgp0NT8xp24884ZAKzZB3rQnfXQU0Tlo2XgZDZD' })

    expect(fbUser).toEqual({
      facebookId: '105242485459312',
      email: 'zeth_hhkywhm_testes@tfbnw.net',
      name: 'Zeth testes'
    })
  })

  it('should return undefined Facebook User if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
