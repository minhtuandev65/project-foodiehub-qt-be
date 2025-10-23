import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/assignRoleToUser').post(
    isAuthorized,
    hasRole(ROLE.ADMIN),
    controller.admin.assignRoleToUser
)

export const admin = Router
