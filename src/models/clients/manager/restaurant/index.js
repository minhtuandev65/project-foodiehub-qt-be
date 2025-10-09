import { createNewRestaurant } from './createNew/createNewRestaurant/createNewRestaurant'
import { createNewStaffForRestaurant } from './createNew/createNewStaffForRestaurant/createNewStaffForRestaurant'
import { findRestaurantById } from './findRestaurantById/findRestaurantById'
import { getAllRestaurantForAdmin } from './getData/getAllRestaurantForAdmin/getAllRestaurantForAdmin'
import { getDetailRestaurantForManager } from './getData/getDetailRestaurantForManager/getDetailRestaurantForManager'
import { getListRestaurantForManager } from './getData/getListRestaurantForManager/getListRestaurantForManager'
import { RESTAURANT_COLLECTION_SCHEMA } from './restaurantModel/restaurantModel'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'
import { validateBeforeCreateRestaurant } from './validateBeforeCreateRestaurant/validateBeforeCreateRestaurant'

export const restaurantModels = {
    RESTAURANT_COLLECTION_SCHEMA,
    validateBeforeCreateRestaurant,
    createNewRestaurant,
    updateRestaurant,
    findRestaurantById,
    getListRestaurantForManager,
    getDetailRestaurantForManager,
    createNewStaffForRestaurant,
    getAllRestaurantForAdmin
}
