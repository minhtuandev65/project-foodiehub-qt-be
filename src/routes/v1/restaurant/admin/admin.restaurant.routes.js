import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/getListRestaurant').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.restaurant.admin.data.list
)

Router.route('/acceptCreateRestaurant/:restaurantId/accept').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.restaurant.admin.action.accept
)
Router.route('/rejectCreateRestaurant/:restaurantId/reject').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.restaurant.admin.action.reject
)

export const admin = Router
