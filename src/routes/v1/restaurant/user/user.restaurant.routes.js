import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasAnyRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/list').get(controller.restaurant.user.data.list)
Router.route('/list-logged-in').get(
    isAuthorized,
    controller.restaurant.user.data.listLoggedIn
)
Router.route('/:restaurantId').get(controller.restaurant.user.data.detail)

Router.route('/logged-in/:restaurantId').get(
    isAuthorized,
    controller.restaurant.user.data.detail
)
Router.route('/rating').post(
    isAuthorized,
    controller.restaurant.user.create.rating
)
Router.route('/comment/:restaurantId').get(
    isAuthorized,
    controller.restaurant.user.data.listComment
)
Router.route('/comment').post(
    isAuthorized,
    hasAnyRole(ROLE.USER),
    controller.restaurant.user.create.comment
)
Router.route('/comment/:commentId').put(
    isAuthorized,
    hasAnyRole(ROLE.MANAGER, ROLE.USER),
    controller.restaurant.user.update.comment
)
Router.route('/comment/:commentId').delete(
    isAuthorized,
    hasAnyRole(ROLE.MANAGER, ROLE.USER),
    controller.restaurant.user.deleting.comment
)
export const user = Router
