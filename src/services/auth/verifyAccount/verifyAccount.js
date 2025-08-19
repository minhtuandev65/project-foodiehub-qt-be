import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import ApiError from '~/utils/ApiError'

export const verifyAccount = async (reqBody) => {
    try {
        const emailValue = reqBody.email

        const existUser = await authModels.findAccountByEmail(emailValue)

        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        if (existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Your account is not active!'
            )

        if (reqBody.token !== existUser.verifyToken) {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Token invalid')
        }
        const updatedData = {
            isActive: true,
            verifyToken: null
        }

        const updatedUser = await authModels.updateMyProfile(
            existUser._id,
            updatedData
        )

        return updatedUser
    } catch (error) {
        throw Error(error)
    }
}
