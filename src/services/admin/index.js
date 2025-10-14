import { assignRoleToUser } from './assignRoleToUser/assignRoleToUser'
import { acceptCreateRestaurant } from './manager/restaurant/acceptCreateRestaurant/acceptCreateRestaurant'
import { getListRestaurantForAdmin } from './manager/restaurant/getData/getListRestaurantForAdmin/getListRestaurantForAdmin'
import { rejectCreateRestaurant } from './manager/restaurant/rejectCreateRestaurant/rejectCreateRestaurant'
import { activateUser } from './users/activateUser/activateUser'
import { getListUserForAdmin } from './users/getData/getListUserForAdmin/getListUserForAdmin'
import { lockUser } from './users/lockUser/lockUser'

const adminServices = {
    assignRoleToUser,
    acceptCreateRestaurant,
    activateUser,
    lockUser,
    rejectCreateRestaurant,
    getListRestaurantForAdmin,
    getListUserForAdmin
}

export default adminServices
