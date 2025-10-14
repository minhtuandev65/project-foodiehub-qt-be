import { assignRoleToUser } from './assignRoleToUser/assignRoleToUser'
import { getListRestaurantForAdmin } from './manager/restaurant/getData/getListRestaurantForAdmin/getListRestaurantForAdmin'
import { acceptCreateRestaurant } from './manager/restaurant/acceptCreateRestaurant/acceptCreateRestaurant'
import { rejectCreateRestaurant } from './manager/restaurant/rejectCreateRestaurant/rejectCreateRestaurant'
import { activateUser } from './users/activateUser/activateUser'
import { lockUser } from './users/lockUser/lockUser'
import { getListUserForAdmin } from './users/getData/getListUserForAdmin/getListUserForAdmin'

const adminControllers = {
    assignRoleToUser,
    acceptCreateRestaurant,
    getListRestaurantForAdmin,
    activateUser,
    lockUser,
    rejectCreateRestaurant,
    getListUserForAdmin
}

export default adminControllers
