import { assignRoleToUser } from './assignRoleToUser/assignRoleToUser'
import { getAllRestaurantForAdmin } from './getData/getAllRestaurantForAdmin/getAllRestaurantForAdmin'
import { acceptCreateRestaurant } from './manager/acceptCreateRestaurant/acceptCreateRestaurant'

const adminControllers = {
    assignRoleToUser,
    acceptCreateRestaurant,
    getAllRestaurantForAdmin
}

export default adminControllers
