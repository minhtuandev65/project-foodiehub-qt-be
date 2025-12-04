import express from 'express'
import { controller } from '~/controllers'
import isAuthorized from '~/middlewares/auth/authMiddleware'

const Router = express.Router()

Router.route('/list').get(controller.restaurant.user.data.list)
Router.route('/list-logged-in').get(
    isAuthorized,
    controller.restaurant.user.data.listLoggedIn
)
Router.route('/:restaurantId').get(controller.restaurant.user.data.detail)
Router.route('/rating').post(
    isAuthorized,
    controller.restaurant.user.create.rating
)
Router.route('/comment').post(
    isAuthorized,
    controller.restaurant.user.create.comment
)
Router.route('/comment/:commentId').put(
    isAuthorized,
    controller.restaurant.user.update.comment
)
Router.route('/comment/:commentId').delete(
    isAuthorized,
    controller.restaurant.user.deleting.comment
)
export const user = Router
