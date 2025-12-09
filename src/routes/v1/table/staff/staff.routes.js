import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasAnyRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/:restaurantId').get(
    isAuthorized,
    hasAnyRole(ROLE.MANAGER, ROLE.STAFF),
    controller.table.staff.data.list
)
export const staff = Router
