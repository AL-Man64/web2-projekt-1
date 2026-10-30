import type { RequestHandler } from 'express'

import * as passesService from '../services/passesService.ts'
import { resolvePassDate, type Pass } from '../viewModels.ts'

export const home: RequestHandler = async (req, res) => {
    const { total, active } = await passesService.getTotalPasses()

    let passes: Pass[] = []
    if (req.oidc.user !== undefined) {
        passes = await passesService.getAllPasses()
    }

    res.render('index', { total, active, user: req.oidc.user, passes })
}

export const info: RequestHandler = async (req, res) => {
    const id = req.params['id']!
    if (typeof id !== 'string') {
        res.sendStatus(400)
        return
    }

    const passRaw = await passesService.getPass(id)
    if (passRaw === undefined) {
        res.sendStatus(404)
        return
    }

    const pass = resolvePassDate(passRaw)

    res.render('info', { pass: pass })
}

export const signup: RequestHandler = (_req, res) => {
    res.oidc.login({
        returnTo: '/',
        authorizationParams: { screen_hint: 'signup' },
    })
}

export const deletePass: RequestHandler = async (req, res) => {
    const id = req.params['id']!
    if (typeof id !== 'string') {
        res.sendStatus(400)
        return
    }

    await passesService.deletePass(id)
    res.redirect(303, '/')
}

export const cancelPass: RequestHandler = async (req, res) => {
    const id = req.params['id']!
    if (typeof id !== 'string') {
        res.sendStatus(400)
        return
    }

    await passesService.cancelPass(id)
    res.redirect(303, '/')
}
