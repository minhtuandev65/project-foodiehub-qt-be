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

export const adminRoute = Router
