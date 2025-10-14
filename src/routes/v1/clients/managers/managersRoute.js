import express from 'express'
import { restaurantRoute } from './restaurant/restaurantRoute'
const Router = express.Router()


Router.use('/restaurant', restaurantRoute)
export const managersRoute = Router
