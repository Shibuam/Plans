
import express from 'express'

import { getUserDetails, login, registration, upgradePlan } from '../controller/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

let router=express.Router()

router.post('/login',login)
router.post('/registration',registration)
router.patch('/upgrade/:userId', protect, upgradePlan)
router.get('/', protect, getUserDetails)

export default router