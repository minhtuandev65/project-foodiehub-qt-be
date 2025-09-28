import { createNewOrganization } from './createNewRestaurant/createNewRestaurant'
import { getListRestaurant } from './getListRestaurant/getListRestaurant'
import { updateRestaurant } from './update/updateRestaurant/updateRestaurant'

export const restaurantServices = {
    createNewOrganization,
    updateRestaurant,
    getListRestaurant
}
