import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import ApiError from '~/utils/ApiError'

export const activateUser = async (userId, t) => {
    const existUser = await authModels.findAccountById(userId)

    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))

    const updatedData = { _destroy: false }
    let updatedUser = await authModels.updateProfileUser(
        existUser._id,
        updatedData
    )
    return updatedUser
}
