import { restaurantModels } from "~/models/clients/manager/restaurant"
import { RESTAURANT_STATUS } from "~/utils/constants"

export const rejectCreateRestaurant = async (restaurantId, t) => {
    const existRestaurant =
        await restaurantModels.findRestaurantById(restaurantId)

    if (!existRestaurant)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    const newUpdateData = {
        status: RESTAURANT_STATUS.REJECT,
        isActive: false
    }
    const result = await restaurantModels.updateRestaurant(
        existRestaurant._id,
        newUpdateData
    )

    return result
}