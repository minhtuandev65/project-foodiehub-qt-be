import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'

export const table = async (newTableData, t) => {
    const { userId, restaurantId, imageURL, ...rest } = newTableData
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
    const uploadResultImage = await CloudStorageProvider.uploadImageToS3(
        imageURL,
        'image-table'
    )

    const newTable = {
        creatorId: userId,
        restaurantId: String(existRestaurant._id),
        imageURL: uploadResultImage.url,
        ...rest
    }

    const result = await models.table.manager.create.table(newTable)

    return { _id: result.insertedId, ...newTable }
}
