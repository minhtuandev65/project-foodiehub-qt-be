/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const unFavorite = async (updateData, t) => {
    try {
        const { userId, restaurantId } = updateData
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
        // B3: Tìm nhà hàng yêu thích
        const existFavorite = await models.favorites.find.favorite(
            restaurantId,
            userId
        )

        const unFavorites = {
            userId: String(existUser._id),
            restaurantId: String(existRestaurant._id),
            favorite: false
        }
        // B4: Nếu có thì hủy yêu thích
        if (!existFavorite) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                t('favorites.favoriteNotFound')
            )
        }
        const result = await models.favorites.update.favorite(unFavorites)
        return result
    } catch (error) {
        throw Error(error)
    }
}
