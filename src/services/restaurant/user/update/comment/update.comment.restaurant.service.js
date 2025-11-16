import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { models } from '~/models'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import { geocodeAddress } from '~/providers/geocodeAddress'
import { ResendProvider } from '~/providers/ResendProvider'
import { templates } from '~/template'
import ApiError from '~/utils/ApiError'
import { RESTAURANT_STATUS } from '~/utils/constants'

export const comment = async (updateData, t) => {
    const { commentId, userId, ...rest } = updateData
    const existComment = await models.restaurant.find.commentId(commentId)
    if (!existComment)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('managers.restaurantNotFound')
        )
    if (userId !== existComment.userId.toString()) {
        throw new ApiError(
            StatusCodes.FORBIDDEN,
            t('managers.notYourRestaurant')
        )
    }
    const result = await models.restaurant.user.update.comment(updateData)
    return result
}
