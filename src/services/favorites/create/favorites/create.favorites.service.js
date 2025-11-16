/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const favorites = async (newData, t) => {
    try {
        const { userId, restaurantId } = newData
        const [existUser, existRestaurant] = await Promise.all([
            models.auth.find.accountById(userId),
            models.restaurant.find.id(restaurantId)
        ])
        // B1: kiểm tra user
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))
        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('user.emailNotActivated')
            )
        // B2: Kiểm tra nhà hàng đã tồn tại hay chưa và có hoạt động không
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
        // B3: Tạo yêu thích nhà hàng
        const newFavorites = {
            userId: String(existUser._id),
            restaurantId: String(existRestaurant._id),
            favorite: true
        }
        const result = await models.favorites.create.favorites(newFavorites)

        return { _id: result.insertedId, ...newFavorites }
    } catch (error) {
        throw Error(error)
    }
}
