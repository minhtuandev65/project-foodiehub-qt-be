import { StatusCodes } from 'http-status-codes'
import { S3StorageCvFile } from '~/middlewares/S3StorageMiddleware/uploadFileS3'
import { authModels } from '~/models/auth'
import ApiError from '~/utils/ApiError'

export const uploadCVFile = async ({ userId, fileBuffer, fileName }) => {
    const user = await authModels.findAccountById(userId)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

    const { key } = await S3StorageCvFile.streamUploadFile(
        fileBuffer,
        fileName,
        'cvs'
    )

    const updatedUser = await authModels.updateMyProfile(userId, { cvKeyS3: key })

    return updatedUser
}
