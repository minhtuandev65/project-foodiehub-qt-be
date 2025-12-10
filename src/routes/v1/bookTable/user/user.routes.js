import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, {
    hasAnyRole,
    hasRole
} from '~/middlewares/auth/authMiddleware'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/:restaurantId').patch(
    isAuthorized,
    hasAnyRole(ROLE.USER, ROLE.STAFF, ROLE.MANAGER),
    controller.bookTable.cancel.bookTable
)

Router.route('/list').get(
    isAuthorized,
    hasRole(ROLE.USER),
    controller.bookTable.user.data.list
)
export const user = Router
