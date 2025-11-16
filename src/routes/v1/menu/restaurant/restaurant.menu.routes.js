import express from 'express'
import { controller } from '~/controllers'
import { middlewares } from '~/middlewares'
import isAuthorized, { hasAnyRole } from '~/middlewares/auth/authMiddleware'

import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/:restaurantId/menus').post(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    middlewares.aws.upload.uploadImageMenu,
    controller.menu.manager.create.menu
)
Router.route('/:menuId').put(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    middlewares.aws.upload.uploadImageMenu,
    controller.menu.manager.update.menu
)

Router.route('/:menuId').delete(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    controller.menu.manager.deleting.menu
)
Router.route('/:restaurantId/uploadPresignBatchMenu').post(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    middlewares.aws.upload.uploadImageMenu,
    controller.menu.manager.upload.presignBatchMenu
)
export const restaurant = Router
