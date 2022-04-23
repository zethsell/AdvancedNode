export class RequiredFieldError extends Error {
  constructor (fieldname: string) {
    super(`The field ${fieldname} is required`)
    this.name = 'RequiredFieldError'
  }
}

export class InvalidMymeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported type. Allowed types: ${allowed.join(', ')}`)
    this.name = 'InvalidMymeTypeError'
  }
}
export class MaxFileSizeError extends Error {
  constructor (maxSizeInMb: number) {
    super(`File upload limit is ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}
