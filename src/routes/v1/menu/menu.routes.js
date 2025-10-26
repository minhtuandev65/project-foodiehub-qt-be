import express from 'express'
import { restaurant } from './restaurant/restaurant.menu.routes'

const Router = express.Router()

Router.use('/restaurant', restaurant)
export const menu = Router
