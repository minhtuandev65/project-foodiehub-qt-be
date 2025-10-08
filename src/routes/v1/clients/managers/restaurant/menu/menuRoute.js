import express from 'express'
import { menuControllers } from '~/controllers/clients/managers/menu'
import isAuthorized, { hasAnyRole } from '~/middlewares/authMiddleware'
import { uploadImageMenu } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadImageMenu'

import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/:restaurantId/createNew').post(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    uploadImageMenu,
    menuControllers.createNewMenu
)
Router.route('/:menuId/update').put(
    isAuthorized,
    hasAnyRole(ROLE.STAFF, ROLE.MANAGER),
    uploadImageMenu,
    menuControllers.updateMenu
)
export const menuRoute = Router
