import { StatusCodes } from 'http-status-codes'
import { restaurantModels } from '~/models/restaurant'
import ApiError from '~/utils/ApiError'
import { RESTAURANT_STATUS } from '~/utils/constants'

export const acceptCreateRestaurant = async (restaurantId) => {
    const existRestaurant =
        await restaurantModels.findRestaurantById(restaurantId)

    if (!existRestaurant)
        throw new ApiError(StatusCodes.NOT_FOUND, 'Restaurant not found!')
    const newUpdateData = {
        status: RESTAURANT_STATUS.ACCEPT,
        isActive: true
    }
    const result = await restaurantModels.updateRestaurant(
        existRestaurant._id,
        newUpdateData
    )

    return result
}
