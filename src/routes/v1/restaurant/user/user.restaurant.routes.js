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
export const user = Router
