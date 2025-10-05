import { createNewRestaurant } from './createNew/createNewRestaurant/createNewRestaurant'
import { createNewStaffForRestaurant } from './createNew/createNewStaffForRestaurant/createNewStaffForRestaurant'
import { getAllRestaurantForAdmin } from '../../../admin/manager/restaurant/getData/getAllRestaurantForAdmin/getAllRestaurantForAdmin'
import { getDetailRestaurantForManager } from './getData/getDetailRestaurantForManager/getDetailRestaurantForManager'
import { getListRestaurantForManager } from './getData/getListRestaurantForManager/getListRestaurantForManager'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'

export const restaurantServices = {
    createNewRestaurant,
    updateRestaurant,
    getListRestaurantForManager,
    getDetailRestaurantForManager,
    createNewStaffForRestaurant,
    getAllRestaurantForAdmin
}
