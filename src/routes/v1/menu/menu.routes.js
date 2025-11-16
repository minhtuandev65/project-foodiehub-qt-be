import express from 'express'
import { restaurant } from './restaurant/restaurant.menu.routes'
import isAuthorized from '~/middlewares/auth/authMiddleware'
import { controller } from '~/controllers'

const Router = express.Router()

Router.route('/:restaurantId').get(isAuthorized, controller.menu.data.list)

Router.use('/restaurant', restaurant)
export const menu = Router
