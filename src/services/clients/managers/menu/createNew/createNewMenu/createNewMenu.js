import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { menuModels } from '~/models/clients/manager/menu'
import { restaurantModels } from '~/models/clients/manager/restaurant'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'

export const createNewMenu = async (newMenuData, t) => {
    try {
        const { userId, restaurantId, imageURL, ...rest } = newMenuData

        const existUser = await authModels.findAccountById(userId)
        const existRestaurant =
            await restaurantModels.findRestaurantById(restaurantId)
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

        const result = await menuModels.createNewMenu(newMenu)

        return { _id: result.insertedId, ...newMenu }
    } catch (error) {
        throw Error(error)
    }
}
