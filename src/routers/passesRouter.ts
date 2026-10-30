import express from 'express'
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'

import * as passesController from '../controllers/passesController.ts'

const router = express.Router()

router.use(
    auth({
        audience: 'WEB2',
        issuerBaseURL: 'https://dev-iv2emum34ikd31i2.us.auth0.com/',
        tokenSigningAlg: 'RS256',
    }),
)
router.use(express.json())

router.get('/:id', requiredScopes('read:passes'), passesController.getPass)
router.post('/', requiredScopes('create:passes'), passesController.createPass)

export default router
