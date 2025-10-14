import express from 'express'
import adminControllers from '~/controllers/admin'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/getListRestaurant').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.getListRestaurantForAdmin
)
Router.route('/getListUser').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.getListUserForAdmin
)
Router.route('/assignRoleToUser').post(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.assignRoleToUser
)
Router.route('/acceptCreateRestaurant/:restaurantId/accept').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.acceptCreateRestaurant
)
Router.route('/rejectCreateRestaurant/:restaurantId/reject').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.rejectCreateRestaurant
)
Router.route('/activateUser/:userId/activate').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.activateUser
)
Router.route('/lockUser/:userId/lock').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    adminControllers.lockUser
)
export const adminRoute = Router
