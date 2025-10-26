import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasAnyRole } from '~/middlewares/auth/authMiddleware'
import { uploadImageTable } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadImageTable'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/:restaurantId/createNewTable').post(
    isAuthorized,
    hasAnyRole(ROLE.MANAGER, ROLE.STAFF),
    uploadImageTable,
    controller.table.manager.create.table
)

Router.route('/:restaurantId/getListTable').get(
    isAuthorized,
    hasAnyRole(ROLE.MANAGER, ROLE.STAFF),
    controller.table.manager.data.list
)

Router.route('/:restaurantId/getDetailTable/:tableId').get(
    isAuthorized,
    hasAnyRole(ROLE.MANAGER, ROLE.STAFF),
    controller.table.manager.data.detail
)

Router.route('/:restaurantId/updateTable').put(
    isAuthorized,
    hasAnyRole(ROLE.MANAGER, ROLE.STAFF),
    controller.table.manager.update.table
)
export const restaurant = Router
