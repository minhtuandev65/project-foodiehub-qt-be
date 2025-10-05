import { assignRoleToUser } from './assignRoleToUser/assignRoleToUser'
import { acceptCreateRestaurant } from './manager/restaurant/acceptCreateRestaurant/acceptCreateRestaurant'
import { getAllRestaurantForAdmin } from './manager/restaurant/getData/getAllRestaurantForAdmin/getAllRestaurantForAdmin'
import { rejectCreateRestaurant } from './manager/restaurant/rejectCreateRestaurant/rejectCreateRestaurant'
import { activateUser } from './users/activateUser/activateUser'
import { lockUser } from './users/lockUser/lockUser'

const adminServices = {
    assignRoleToUser,
    acceptCreateRestaurant,
    activateUser,
    lockUser,
    rejectCreateRestaurant,
    getAllRestaurantForAdmin
}

export default adminServices
