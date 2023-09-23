import * as path from 'path'
import { Pool } from 'pg'
import { promises as fs } from 'fs'
import {
    Kysely,
    Migrator,
    PostgresDialect,
    FileMigrationProvider,
} from 'kysely'
import { DB } from 'kysely-codegen'
import { run } from 'kysely-migration-cli'

const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.DATABASE_URL
        }),
    }),
})

const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
        fs,
        path,
        // This needs to be an absolute path.
        migrationFolder: path.join(__dirname, './migrations'),
    }),
})

run(db, migrator, 'src/db/migrations')