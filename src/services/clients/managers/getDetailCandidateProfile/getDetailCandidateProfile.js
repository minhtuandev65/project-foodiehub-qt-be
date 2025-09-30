import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { candidateProfileModels } from '~/models/candidateProfile'
import { CloudStorageProvider } from '~/providers/cloudStorageProvider'
import ApiError from '~/utils/ApiError'

export const getDetailCandidateProfile = async (userId, t) => {
    const existUser = await authModels.findAccountById(userId)
    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('auth.accountNotFound'))

    if (!existUser.isActive)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('user.emailNotActivated')
        )
    const fileKey = existUser.cvKeyS3
    if (!fileKey) throw new ApiError(StatusCodes.NOT_FOUND, t('CVNotFound'))
    const result =
        await candidateProfileModels.getDetailCandidateProfile(userId)
    const userCvUrl = await CloudStorageProvider.getCvUrl(fileKey)
    const data = { ...result, cvUrl: userCvUrl }
    return data
}
