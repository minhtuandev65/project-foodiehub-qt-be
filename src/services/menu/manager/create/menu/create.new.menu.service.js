/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'

export const menu = async (newMenuData, t) => {
    try {
        const { userId, restaurantId, imageURL, ...rest } = newMenuData

        const existUser = await models.auth.find.accountById(userId)
        const existRestaurant = await models.restaurant.find.id(restaurantId)
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

        const uploadResultImage = await CloudStorageProvider.uploadImageToS3(
            imageURL,
            'image-menu'
        )

        const newMenu = {
            creatorId: userId,
            restaurantId: String(existRestaurant._id),
            imageURL: uploadResultImage.url,
            ...rest
        }

        const result = await models.menu.manager.create.menu(newMenu)

        return { _id: result.insertedId, ...newMenu }
    } catch (error) {
        throw Error(error)
    }
}
