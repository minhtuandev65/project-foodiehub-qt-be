import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/restaurants').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.restaurant.admin.data.list
)

Router.route('/:restaurantId/accept').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.restaurant.admin.action.accept
)
Router.route('/:restaurantId/reject').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.restaurant.admin.action.reject
)

export const admin = Router
