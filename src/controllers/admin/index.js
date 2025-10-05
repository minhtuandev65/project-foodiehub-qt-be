import { assignRoleToUser } from './assignRoleToUser/assignRoleToUser'
import { getAllRestaurantForAdmin } from './getData/getAllRestaurantForAdmin/getAllRestaurantForAdmin'
import { acceptCreateRestaurant } from './manager/restaurant/acceptCreateRestaurant/acceptCreateRestaurant'
import { rejectCreateRestaurant } from './manager/restaurant/rejectCreateRestaurant/rejectCreateRestaurant'
import { activateUser } from './users/activateUser/activateUser'
import { lockUser } from './users/lockUser/lockUser'

const adminControllers = {
    assignRoleToUser,
    acceptCreateRestaurant,
    getAllRestaurantForAdmin,
    activateUser,
    lockUser,
    rejectCreateRestaurant
}

export default adminControllers
