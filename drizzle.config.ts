import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env['DATABASE_HOST']!,
        database: process.env['DATABASE_NAME']!,
        port: Number.parseInt(process.env['DATABASE_PORT']!),
        user: process.env['DATABASE_USER']!,
        password: process.env['DATABASE_PASSWORD']!,
        ssl: true,
    },
})
