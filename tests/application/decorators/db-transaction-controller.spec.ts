import { mock, MockProxy } from 'jest-mock-extended'

class DbTransactionController {
  constructor (private readonly db: DbTransaction) {}
  async perform (httpRequest: any): Promise<void> {
    await this.db.openTransaction()
  }
}
interface DbTransaction {
  openTransaction: () => Promise<void>
}

describe('DbTransactionController', () => {
  let db: MockProxy<DbTransaction>
  let sut: DbTransactionController

  beforeAll(() => {
    db = mock<DbTransaction>()
  })

  beforeEach(async () => {
    sut = new DbTransactionController(db)
  })

  it('should open trnsaction', async () => {
    await sut.perform({ any: 'any' })
    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })
})
