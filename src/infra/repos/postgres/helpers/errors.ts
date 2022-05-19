export class ConnectionNotFoundError extends Error {
  constructor () {
    super('No Connection was found')
    this.name = 'ConnectionNotFoundError'
  }
}
