import express from 'express'
import { controller } from '~/controllers'
import adminControllers from '~/controllers/admin'
import isAuthorized, { hasRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/list').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.user.admin.data.list
)
Router.route('/:userId').get(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.user.admin.data.detail
)
Router.route('/:userId/activate').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.user.admin.action.activate
)
Router.route('/:userId/lock').patch(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.user.admin.action.lock
)
export const admin = Router
