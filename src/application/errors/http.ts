export class ServerError extends Error {
  constructor (error?: Error | any) {
    super('Server failed. Try again later.')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Error {
  constructor (fieldname: string) {
    super(`The field ${fieldname} is required`)
    this.name = 'RequiredFieldError'
  }
}
export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}
