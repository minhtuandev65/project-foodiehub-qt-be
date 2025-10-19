import express from 'express'
import { controller } from '~/controllers'
import isAuthorized, { hasRole } from '~/middlewares/authMiddleware'
import { uploadRestaurantFiles } from '~/middlewares/S3StorageMiddleware/useUploadFiles/uploadRestaurantFiles'

import { ROLE } from '~/utils/constants'

const Router = express.Router()

Router.route('/getListRestaurant').get(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.data.list
)
Router.route('/getDetailRestaurant/:restaurantId/detail').get(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.data.detail
)
Router.route('/createNewRestaurant').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    uploadRestaurantFiles,
    controller.restaurant.manager.create.restaurant
)
Router.route('/:restaurantId/addStaff').post(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.create.staff
)
Router.route('/:restaurantId/update').put(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.update.restaurant
)
Router.route('/:staffId/delete').delete(
    isAuthorized,
    hasRole(ROLE.MANAGER),
    controller.restaurant.manager.deleting.staff
)

export const manager = Router
