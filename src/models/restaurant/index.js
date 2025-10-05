import { createNewRestaurant } from './createNewRestaurant/createNewRestaurant'
import { findRestaurantById } from './findRestaurantById/findRestaurantById'
import { getListCandidateProfile } from './getData/getListCandidateProfile/getListCandidateProfile'
import { getDetailRestaurantForManager } from './getData/getDetailRestaurantForManager/getDetailRestaurantForManager'
import { getListRestaurantForManager } from './getData/getListRestaurantForManager/getListRestaurantForManager'
import { RESTAURANT_COLLECTION_SCHEMA } from './restaurantModel/restaurantModel'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'
import { validateBeforeCreateRestaurant } from './validateBeforeCreateRestaurant/validateBeforeCreateRestaurant'
import { createNewStaffForRestaurant } from './createNewStaffForRestaurant/createNewStaffForRestaurant'
import { getAllRestaurantForAdmin } from './getData/getAllRestaurantForAdmin/getAllRestaurantForAdmin'

export const restaurantModels = {
    RESTAURANT_COLLECTION_SCHEMA,
    validateBeforeCreateRestaurant,
    createNewRestaurant,
    updateRestaurant,
    findRestaurantById,
    getListRestaurantForManager,
    getDetailRestaurantForManager,
    getListCandidateProfile,
    createNewStaffForRestaurant,
    getAllRestaurantForAdmin
}
