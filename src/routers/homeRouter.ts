import express from 'express'
import * as homeController from '../controllers/homeController.ts'

const router = express.Router()

router.get('/', homeController.home)

router.get('/info/:id', homeController.info)
router.post('/deletePass/:id', homeController.deletePass)
router.post('/cancelPass/:id', homeController.cancelPass)

router.get('/signup', homeController.signup)

export default router
