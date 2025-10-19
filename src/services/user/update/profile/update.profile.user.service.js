import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'

export const updateProfileUser = async (userId, reqData, imageFile, t) => {
    const { gender, ...reqDataRest } = reqData
console.log(gender)
    const existUser = await models.auth.find.accountById(userId)

    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))

    if (!existUser.isActive)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('user.accountNotActive')
        )


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
            gender: gender,
            avatar: uploadResult.url
        }
        result = await models.auth.update.updateProfileUser(
            existUser._id,
            updatedData
        )
    } else {
        const updatedData = {
            ...reqDataRest,
            gender: gender
        }

        result = await models.auth.update.updateProfileUser(
            existUser._id,
            updatedData
        )
    }

    return result
}
