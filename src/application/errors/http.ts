export class ServerError extends Error {
  constructor (error?: Error | any) {
    super('Server failed. Try again later.')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
