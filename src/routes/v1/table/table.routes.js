import express from 'express'
import { restaurant } from './restaurant/restaurant.routes'

const Router = express.Router()

// route manager
Router.use('/restaurant', restaurant)

export const table = Router
