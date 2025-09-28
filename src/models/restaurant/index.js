import { createNewRestaurant } from './createNewRestaurant/createNewRestaurant'
import { findRestaurantById } from './findRestaurantById/findRestaurantById'
import { getListCandidateProfile } from './getData/getListCandidateProfile/getListCandidateProfile'
import { getDetailRestaurant } from './getData/getDetailRestaurant/getDetailRestaurant'
import { getListRestaurant } from './getData/getListRestaurant/getListRestaurant'
import { RESTAURANT_COLLECTION_SCHEMA } from './restaurantModel/restaurantModel'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'
import { validateBeforeCreateRestaurant } from './validateBeforeCreateRestaurant/validateBeforeCreateRestaurant'

export const restaurantModels = {
    RESTAURANT_COLLECTION_SCHEMA,
    validateBeforeCreateRestaurant,
    createNewRestaurant,
    updateRestaurant,
    findRestaurantById,
    getListRestaurant,
    getDetailRestaurant,
    getListCandidateProfile
}
