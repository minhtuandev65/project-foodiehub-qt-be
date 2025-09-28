import express from 'express'
import { organizationController } from '~/controllers/organization'
import { restaurantController } from '~/controllers/restaurant'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { uploadOrganizationFiles } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadOrganizationFiles'
import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/getListRestaurant').get(
    isAuthorized,
    restaurantController.getListRestaurant
)
Router.route('/createNewRestaurant').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    uploadOrganizationFiles,
    restaurantController.createNewRestaurant
)
Router.route('/:restaurantId/addStaff').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    organizationController.addNewStaff
)
Router.route('/:restaurantId/update').put(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    restaurantController.updateRestaurant
)

export const restaurantRoute = Router
