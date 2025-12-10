/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const bookTable = async (updateData, t) => {
    try {
        const { userId, restaurantId, tableId } = updateData

        const [existUser, existRestaurant, existTable] = await Promise.all([
            models.auth.find.accountById(userId),
            models.restaurant.find.id(restaurantId),
            models.table.find.id(tableId)
        ])

        if (!existRestaurant)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                t('managers.restaurantNotFound')
            )
        if (!existRestaurant.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('managers.waitAcceptRestaurant')
            )
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))
        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('user.emailNotActivated')
            )
        if (String(existTable.restaurantId) !== String(existRestaurant._id)) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('table.notBelongToRestaurant')
            )
        }

        const result = await models.bookTable.update.destroy(tableId, {
            _destroy: true,
            status: 2
        })

        return result
    } catch (error) {
        throw Error(error)
    }
}
