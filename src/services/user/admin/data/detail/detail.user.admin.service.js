import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const detail = async (userId, t) => {
    const existUser = await models.auth.find.accountById(userId)
    if (!existUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))
    }
    const result = await models.user.admin.data.detail(userId)

    const data = {
        ...result
    }
    return data
}
