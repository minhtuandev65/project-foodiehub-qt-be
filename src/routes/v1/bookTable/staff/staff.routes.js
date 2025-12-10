import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasAnyRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()
Router.route('/:restaurantId').post(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    controller.bookTable.staff.create.bookTable
)
Router.route('/:restaurantId').patch(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    controller.bookTable.staff.cancel.bookTable
)

Router.route('/:restaurantId').get(controller.bookTable.data.list)

export const staff = Router
