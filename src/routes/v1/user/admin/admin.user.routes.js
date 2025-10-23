import express from 'express'
import { controller } from '~/controllers'
import adminControllers from '~/controllers/admin'
import isAuthorized, { hasRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/getListUser').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.user.admin.data.list
)

Router.route('/activateUser/:userId/activate').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.user.admin.action.activate
)
Router.route('/lockUser/:userId/lock').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.user.admin.action.lock
)
export const admin = Router
