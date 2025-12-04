import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const comment = async (dataComment, t) => {
    const user = await models.user.find.id(dataComment?.userId)
    const result = await models.restaurant.user.create.comment({...dataComment, fullName: user.fullName, avatar: user.avatar})
    const createdAt = new Date(result.createdAt).toLocaleDateString('vi-VN')
    
    const data = {
        ...result,
        createdAt,
    }
    return data
}
