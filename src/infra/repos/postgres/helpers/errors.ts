export class ConnectionNotFoundError extends Error {
  constructor () {
    super('No Connection was found')
    this.name = 'ConnectionNotFoundError'
  }
}

export class TransactionNotFoundError extends Error {
  constructor () {
    super('No Transaction was found')
    this.name = 'TransactionNotFoundError'
  }
}
