import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasRole } from '~/middlewares/auth/authMiddleware'

import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/:restaurantId').get(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.menu.manager.data.list
)
export const manager = Router
