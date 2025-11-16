import express from 'express'
import { restaurant } from './restaurant/restaurant.routes'
import isAuthorized from '~/middlewares/auth/authMiddleware'
import { controller } from '~/controllers'

const Router = express.Router()

Router.route('/:restaurantId').get(isAuthorized, controller.table.data.list)
Router.route('/:restaurantId').get(isAuthorized, controller.table.data.list)

Router.route('/:restaurantId/getDetailTable/:tableId').get(
    isAuthorized,
    controller.table.data.detail
)
// route manager
Router.use('/restaurant', restaurant)

export const table = Router
