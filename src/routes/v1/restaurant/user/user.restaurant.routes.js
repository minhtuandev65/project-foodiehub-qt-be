import express from 'express'
import { controller } from '~/controllers'

const Router = express.Router()

Router.route('/list').get(controller.restaurant.user.data.list)
Router.route('/:restaurantId').get(controller.restaurant.user.data.detail)
export const user = Router
