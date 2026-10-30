import type { Request, Response } from 'express'
import * as passesService from '../services/passesService.ts'
import * as utils from '../utils.ts'

import qr from 'qrcode'

const baseUrl = utils.getEnvVar('BASE_URL', 'http://localhost:3000')

export async function getPass(req: Request, res: Response) {
    let id = req.params['id']!
    if (typeof id !== 'string') {
        res.status(400)
        res.send({ message: 'The application expects a single `id` as a path parameter' })
        return
    }

    const pass = await passesService.getPass(id)
    if (pass === undefined) {
        res.status(404)
        res.send({ message: `Pass with id ${id} not found` })
        return
    }

    res.send(pass)
}

export async function createPass(req: Request, res: Response) {
    const name = req.body['name']
    const document = req.body['document']

    if (typeof name !== 'string') {
        res.status(400)
        res.send({ message: '`name` is required and should be a string' })
    }
    if (typeof document !== 'string') {
        res.status(400)
        res.send({ message: '`document` is required and should be a string' })
    }

    const pass = await passesService.createPass(name, document)
    if (pass === undefined) {
        res.status(500)
        res.send({ message: 'Failed to create pass' })
        return
    }
    res.status(201)

    const locationUrl = baseUrl + '/passes/' + pass.id
    res.setHeader('Location', locationUrl)

    const qrCodeUrl = baseUrl + '/info/' + pass.id
    res.setHeader('Content-Type', 'image/png')
    qr.toFileStream(res, qrCodeUrl, { type: 'png' })
}
