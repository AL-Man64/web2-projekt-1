import * as pg from 'drizzle-orm/pg-core'

export const pass = pg.pgTable('pass', {
    id: pg.uuid().primaryKey().defaultRandom(),
    name: pg.varchar({ length: 50 }).notNull(),
    document: pg.varchar({ length: 50 }).notNull(),
    issuedAt: pg.timestamp('issued_at').notNull().defaultNow(),
    status: pg.varchar().notNull().default('ACTIVE'),
})
