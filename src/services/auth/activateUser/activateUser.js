import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import ApiError from '~/utils/ApiError'

export const activateUser = async (userId) => {
    try {
        const existUser = await authModels.findAccountById(userId)

        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        const updatedData = { isActive: true }
        let updatedUser = await authModels.updateMyProfile(
            existUser._id,
            updatedData
        )
        return updatedUser
    } catch (error) {
        throw Error(error)
    }
}
