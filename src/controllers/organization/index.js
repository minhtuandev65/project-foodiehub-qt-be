import { addNewStaff } from './addNewStaff/addNewStaff'
import { createNewOrganization } from './createNewOrganization/createNewOrganization'
import { updateOrganization } from '../restaurant/update/updateRestaurant/updateRestaurant'

export const organizationController = {
    createNewOrganization,
    addNewStaff,
    updateOrganization
}
