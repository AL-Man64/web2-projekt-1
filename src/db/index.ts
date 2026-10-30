import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle({
    connection: {
        host: process.env['DATABASE_HOST']!,
        database: process.env['DATABASE_NAME']!,
        port: Number.parseInt(process.env['DATABASE_PORT']!),
        user: process.env['DATABASE_USER']!,
        password: process.env['DATABASE_PASSWORD']!,
        ssl: true,
    },
})
