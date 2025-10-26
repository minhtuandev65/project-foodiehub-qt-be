import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'
export const lock = async (restaurantId, t) => {
    const existRestaurant = await models.restaurant.find.id(restaurantId)

    if (!existRestaurant)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    const newUpdateData = {
        _destroy: true
    }
    const result = await models.restaurant.admin.update.restaurant(
        String(existRestaurant._id),
        newUpdateData
    )

    return result
}
