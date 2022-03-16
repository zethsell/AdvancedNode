import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5436,
  username: 'postgres',
  password: '123456789',
  database: 'postgres',
  entities: ['dist/infra/postgres/entities/index.js']
}
