import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'

export const updateMyProfile = async (userId, reqData, imageFile) => {
    try {
        const { gender, ...reqDataRest } = reqData

        const existUser = await authModels.findAccountById(userId)

        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Please activate your account first!'
            )

        const upperGender = gender.toUpperCase()

        let result = {}

        if (imageFile) {
            const { buffer, mimetype, originalname } = imageFile
            const uploadResult = await CloudStorageProvider.uploadImageToS3(
                { buffer, mimetype },
                originalname,
                'avatar-users'
            )

            const updatedData = {
                ...reqDataRest,
                gender: upperGender,
                avatar: uploadResult.url
            }
            result = await authModels.updateMyProfile(
                existUser._id,
                updatedData
            )
        } else {
            const updatedData = {
                ...reqDataRest,
                gender: upperGender
            }

            result = await authModels.updateMyProfile(
                existUser._id,
                updatedData
            )
        }

        return result
    } catch (error) {
        throw new Error(error)
    }
}
