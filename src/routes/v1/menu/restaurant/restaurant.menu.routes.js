import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasAnyRole } from '~/middlewares/authMiddleware'
import { uploadImageMenu } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadImageMenu'

import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/:restaurantId/createNew').post(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    uploadImageMenu,
    controller.menu.manager.create.menu
)
Router.route('/:menuId/update').put(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    uploadImageMenu,
    controller.menu.manager.update.menu
)
Router.route('/:restaurantId/getListMenu').get(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    controller.menu.manager.data.list
)
Router.route('/:menuId/delete').delete(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    controller.menu.manager.deleting.menu
)
export const restaurant = Router
