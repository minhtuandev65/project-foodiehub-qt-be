import { createNewOrganization } from './createNewRestaurant/createNewRestaurant'
import { getDetailRestaurant } from './getData/getDetailRestaurant/getDetailRestaurant'
import { getListRestaurant } from './getData/getListRestaurant/getListRestaurant'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'

export const restaurantServices = {
    createNewOrganization,
    updateRestaurant,
    getListRestaurant,
    getDetailRestaurant
}
