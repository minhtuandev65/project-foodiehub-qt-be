import { createNewRestaurant } from './createNew/createNewRestaurant/createNewRestaurant'
import { getDetailRestaurant } from './getData/getDetailRestaurant/getDetailRestaurant'
import { getListRestaurant } from './getData/getListRestaurant/getListRestaurant'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'

export const restaurantController = {
    createNewRestaurant,
    updateRestaurant,
    getListRestaurant,
    getDetailRestaurant
}
