import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasAnyRole } from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()
Router.route('/:restaurantId').post(
    isAuthorized,
    hasAnyRole(ROLE.USER, ROLE.STAFF, ROLE.MANAGER),
    controller.bookTable.create.bookTable
)
Router.route('/:restaurantId').patch(
    isAuthorized,
    hasAnyRole(ROLE.USER, ROLE.STAFF, ROLE.MANAGER),
    controller.bookTable.cancel.bookTable
)

export const bookTable = Router
