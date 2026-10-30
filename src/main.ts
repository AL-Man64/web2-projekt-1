import dotenv from 'dotenv'
dotenv.config()

import path from 'node:path'
import express from 'express'
import { auth } from 'express-openid-connect'

import * as utils from './utils.ts'
import passesRouter from './routers/passesRouter.ts'
import homeRouter from './routers/homeRouter.ts'
import { errorMiddleware } from './middleware.ts'

let app = express()

app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        secret: process.env['SESSION_SECRET']!,
        baseURL: process.env['BASE_URL']!,
        clientID: process.env['CLIENT_ID']!,
        issuerBaseURL: process.env['ISSUER_BASE_URL']!,
    }),
)
app.use(errorMiddleware)

// Set up view engine
app.set('view engine', 'pug')
app.set('views', path.join(import.meta.dirname, 'views'))

// Register routers
app.use('/', homeRouter)
app.use('/passes', passesRouter)

// Start the server
let HOST = utils.getEnvVar('HOST', 'localhost')
let PORT = Number.parseInt(utils.getEnvVar('PORT', '3000'))

app.listen(PORT, HOST, (err) => {
    if (err === undefined) {
        console.log(`Server is listening on ${HOST}:${PORT}`)
    } else {
        console.error(err)
    }
})
