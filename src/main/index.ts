import './config/module-alias'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import 'reflect-metadata'

PgConnection.getInstance().connect()
  .then(() => app.listen(env.port, () => console.log(`Server running on http://localhost:${env.port}`)))
  .catch(console.error)
