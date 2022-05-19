import { config, S3 } from 'aws-sdk'
import { UploadFile, DeleteFile } from '@/domain/contracts/gateways'

export class AwsS3FileStorage implements UploadFile, DeleteFile {
  constructor (accessKey: string, secret: string, private readonly bucket: string) {
    config.update({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
  }

  async upload ({ filename, file }: UploadFile.Input): Promise<UploadFile.Output> {
    await new S3().putObject({
      Bucket: this.bucket,
      Key: filename,
      Body: file,
      ACL: 'public-read'
    }).promise()
    return `https://${this.bucket}.s3.amazonaws.com/${encodeURIComponent(filename)}`
  }

  async delete ({ filename }: DeleteFile.Input): Promise<void> {
    await new S3().deleteObject({
      Bucket: this.bucket,
      Key: filename
    }).promise()
  }
}
