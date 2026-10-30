import type { RequestHandler } from 'express'

export const errorMiddleware: RequestHandler = (_req, res, next) => {
    try {
        next()
    } catch (e) {
        console.error(e)
        if (process.env['NODE_ENV'] === 'development') {
            res.status(500)
            res.send(e)
        } else {
            res.sendStatus(500)
        }
    }
}
