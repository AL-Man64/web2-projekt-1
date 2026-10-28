import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

let app = express()

app.use(express.json())

app.get('/', (_req, res) => {
    res.send({ message: 'Hello, World!' })
})

let HOST: string = '127.0.0.1'
if (process.env['HOST'] !== undefined) {
    HOST = process.env['HOST']
}

let PORT: number = 3000
if (process.env['PORT'] !== undefined) {
    PORT = Number.parseInt(process.env['PORT'])
}

app.listen(PORT, HOST, (err) => {
    if (err === undefined) {
        console.log(`Server is listening on ${HOST}:${PORT}`)
    } else {
        console.error(err)
    }
})
