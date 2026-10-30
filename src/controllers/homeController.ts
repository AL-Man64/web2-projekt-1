import type { Request, Response } from 'express'

import * as passesService from '../services/passesService.ts'
import { resolvePassDate, type Pass } from '../viewModels.ts'

export async function home(req: Request, res: Response) {
    const { total, active } = await passesService.getTotalPasses()

    let passes: Pass[] = []
    if (req.oidc.user !== undefined) {
        passes = await passesService.getAllPasses()
    }

    res.render('index', { total, active, user: req.oidc.user, passes })
}

export async function info(req: Request, res: Response) {
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

export async function signup(_req: Request, res: Response) {
    res.oidc.login({
        returnTo: '/',
        authorizationParams: { screen_hint: 'signup' },
    })
}

export async function deletePass(req: Request, res: Response) {
    const id = req.params['id']!
    if (typeof id !== 'string') {
        res.sendStatus(400)
        return
    }

    await passesService.deletePass(id)
    res.redirect(303, '/')
}

export async function cancelPass(req: Request, res: Response) {
    const id = req.params['id']!
    if (typeof id !== 'string') {
        res.sendStatus(400)
        return
    }

    await passesService.cancelPass(id)
    res.redirect(303, '/')
}
