import express from 'express'
import { menuControllers } from '~/controllers/clients/managers/menu'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { uploadImageMenu } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadImageMenu'

import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/:restaurantId/createNew').post(
    isAuthorized,
    hasRole(ROLE.MANAGER, ROLE.STAFF),
    uploadImageMenu,
    menuControllers.createNewMenu
)

export const menuRoute = Router
