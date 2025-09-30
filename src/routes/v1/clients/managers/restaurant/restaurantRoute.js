import express from 'express'
import { restaurantController } from '~/controllers/clients/managers/restaurant'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { uploadRestaurantFiles } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadRestaurantFiles'

import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/getListRestaurant').get(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    restaurantController.getListRestaurantForManager
)
Router.route('/getDetailRestaurant/:restaurantId/detail').get(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    restaurantController.getDetailRestaurantForManager
)
Router.route('/createNewRestaurant').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    uploadRestaurantFiles,
    restaurantController.createNewRestaurant
)
Router.route('/:restaurantId/addStaff').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    restaurantController.createNewStaffForRestaurant
)
Router.route('/:restaurantId/update').put(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    restaurantController.updateRestaurant
)
export const restaurantRoute = Router
