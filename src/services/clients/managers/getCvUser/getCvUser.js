import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'

export const getCvUser = async (userId) => {
    try {
        const existUser = await authModels.findAccountById(userId)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Your account is not active!'
            )
        const fileKey = existUser.cvKeyS3
        if (!fileKey) throw new ApiError(StatusCodes.NOT_FOUND, 'CV not found!')

        const userCvUrl = await CloudStorageProvider.getCvUrl(fileKey)
        return userCvUrl
    } catch (error) {
        throw Error(error)
    }
}
