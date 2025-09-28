import { createNewRestaurant } from './createNew/createNewRestaurant/createNewRestaurant'
import { getListRestaurant } from './getListRestaurant/getListRestaurant'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'

export const restaurantController = {
    createNewRestaurant,
    updateRestaurant,
    getListRestaurant
}
