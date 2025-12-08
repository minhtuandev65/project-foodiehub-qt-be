import express from 'express'
import { restaurant } from './restaurant/restaurant.menu.routes'
import { controller } from '~/controllers'
import { manager } from './manager/menu.manager.routes'

const Router = express.Router()

Router.route('/:restaurantId').get(controller.menu.data.list)

Router.use('/restaurant', restaurant)
Router.use('/manager', manager)
export const menu = Router
