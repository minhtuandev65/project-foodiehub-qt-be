import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const lock = async (userId, t) => {
    const existUser = await models.auth.find.accountById(userId)

    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))

    const updatedData = { _destroy: true }
    let updatedUser = await models.auth.update.updateProfileUser(
        existUser._id,
        updatedData
    )
    return updatedUser
}
