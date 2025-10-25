import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const activate = async (userId, t) => {
    const existUser = await models.auth.find.accountById(userId)

    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))

    const updatedData = { _destroy: false }
    let updatedUser = await models.user.admin.update.user(
        String(existUser._id),
        updatedData
    )
    return updatedUser
}
