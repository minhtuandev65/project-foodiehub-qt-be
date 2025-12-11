import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasAnyRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'
import { staff } from './staff/staff.routes'
import { user } from './user/user.routes'

const Router = express.Router()
Router.route('/:restaurantId').post(
    isAuthorized,
    hasAnyRole(ROLE.USER, ROLE.STAFF, ROLE.MANAGER, ROLE.ADMIN),
    controller.bookTable.create.bookTable
)
Router.route('/:restaurantId').patch(
    isAuthorized,
    hasAnyRole(ROLE.USER, ROLE.STAFF, ROLE.MANAGER),
    controller.bookTable.cancel.bookTable
)

Router.route('/:restaurantId').get(controller.bookTable.data.list)
Router.use('/staff', staff)
Router.use('/user', user)
export const bookTable = Router
