import { models } from '~/models'
import ApiError from '~/utils/ApiError'
import { RESTAURANT_STATUS } from '~/utils/constants'

export const reject = async (restaurantId, t) => {
    const existRestaurant = await models.restaurant.find.id(restaurantId)

    if (!existRestaurant)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    const newUpdateData = {
        status: RESTAURANT_STATUS.REJECT,
        isActive: false
    }
    const result = await models.restaurant.manager.update.restaurant(
        existRestaurant._id,
        newUpdateData
    )

    return result
}
