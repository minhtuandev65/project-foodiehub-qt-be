import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const rating = async (dataRating, t) => {
    const { restaurantId, userId } = dataRating

    const result = await models.restaurant.user.create.rating(dataRating)

    const createdAt = new Date(result.createdAt).toLocaleDateString('vi-VN')

    const data = {
        ...result,
        createdAt
    }
    return data
}
