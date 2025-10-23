import express from 'express'
import { controller } from '~/controllers'
import { middlewares } from '~/middlewares'
import isAuthorized, { hasRole } from '~/middlewares/auth/authMiddleware'

import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/list').get(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.data.list
)
Router.route('/:restaurantId/detail').get(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.data.detail
)
Router.route('/restaurants').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    middlewares.aws.upload.uploadRestaurantFiles,
    controller.restaurant.manager.create.restaurant
)
Router.route('/:restaurantId/staff').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.create.staff
)
Router.route('/:restaurantId/update').put(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.update.restaurant
)
Router.route('/:staffId/delete').delete(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.deleting.staff
)

export const manager = Router
