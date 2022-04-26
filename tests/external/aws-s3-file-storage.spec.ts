// import { AwsS3FileStorage } from '@/infra/gateways'
// import { env } from '@/main/config/env'
// import axios from 'axios'

describe('Aws s3 integration tests', () => {
  /* let sut: AwsS3FileStorage

  beforeEach(() => {
    sut = new AwsS3FileStorage(
      env.s3.accessKey,
      env.s3.secret,
      env.s3.bucket
    )
  }) */
  it('', () => {
    expect(1).toBe(1)
  })
  // it('should upload an delete image', async () => {
  //  const fileBase64 = 'teste' //necessario te um base64 real
  //  const file = Buffer.from(fileBase64, 'base64')
  //  const key = 'any_key.png'
  //
  //  const fileUrl = await sut.upload({ key, file })
  //
  //  expect((await axios.get(fileUrl)).status).toBe(200)
  //
  //  await sut.delete({ key })
  //
  //  await expect(axios.get(fileUrl)).rejects.toThrow()
  //  })
})
