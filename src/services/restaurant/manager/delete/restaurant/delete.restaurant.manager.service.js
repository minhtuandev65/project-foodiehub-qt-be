import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const restaurant = async (restaurantId, t) => {
    const existRestaurant = await models.restaurant.find.id(
        String(restaurantId)
    )

    if (!existRestaurant)
        throw new ApiError(StatusCodes.NOT_FOUND, t('Không tìm thấy nhà hàng'))

    const newUpdateData = {
        _destroy: true
    }

    const result = await models.restaurant.manager.deleting.restaurant(
        String(existRestaurant._id),
        newUpdateData
    )

    return result
}
