import express from 'express'
import adminControllers from '~/controllers/admin'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/assignRoleToUser').post(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.assignRoleToUser
)
Router.route('/acceptCreateRestaurant/:restaurantId/accept').put(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.acceptCreateRestaurant
)
export const adminRoute = Router
