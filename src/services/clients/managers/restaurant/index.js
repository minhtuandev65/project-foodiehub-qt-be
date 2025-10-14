import { createNewRestaurant } from './createNew/createNewRestaurant/createNewRestaurant'
import { createNewStaffForRestaurant } from './createNew/createNewStaffForRestaurant/createNewStaffForRestaurant'
import { getDetailRestaurantForManager } from './getData/getDetailRestaurantForManager/getDetailRestaurantForManager'
import { getListRestaurantForManager } from './getData/getListRestaurantForManager/getListRestaurantForManager'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'
import { deleteStaffForRestaurant } from './delete/deleteStaffForRestaurant/deleteStaffForRestaurant'

export const restaurantServices = {
    createNewRestaurant,
    updateRestaurant,
    getListRestaurantForManager,
    getDetailRestaurantForManager,
    createNewStaffForRestaurant,
    deleteStaffForRestaurant
}
