import { MaxFileSizeError } from '@/application/errors'

export class MaxFileSize {
  constructor (
    private readonly maxSizeInMb: number,
    private readonly value: Buffer
  ) { }

  validate (): Error | undefined {
    const maxSizeInMb = 5 * 1024 * 1024
    if (this.value.length > maxSizeInMb) return new MaxFileSizeError(this.maxSizeInMb)
  }
}
