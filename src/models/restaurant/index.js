import { createNewRestaurant } from './createNewRestaurant/createNewRestaurant'
import { findRestaurantById } from './findRestaurantById/findRestaurantById'
import { RESTAURANT_COLLECTION_SCHEMA } from './restaurantModel/restaurantModel'
import { updateRestaurant } from './update/updateRestaurant'
import { validateBeforeCreateRestaurant } from './validateBeforeCreateRestaurant/validateBeforeCreateRestaurant'

export const restaurantModels = {
    RESTAURANT_COLLECTION_SCHEMA,
    validateBeforeCreateRestaurant,
    createNewRestaurant,
    updateRestaurant,
    findRestaurantById
}
