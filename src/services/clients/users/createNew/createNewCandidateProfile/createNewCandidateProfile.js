import { StatusCodes } from 'http-status-codes'
import { S3StorageCvFile } from '~/middlewares/S3StorageMiddleware/uploadFileS3'
import { authModels } from '~/models/auth'
import { candidateProfileModels } from '~/models/candidateProfile'
import { organizationModels } from '~/models/organization'
import ApiError from '~/utils/ApiError'

export const createNewCandidateProfile = async (reqData) => {
    const {
        userId,
        buffer,
        originalname,
        firstName,
        lastName,
        gender,
        organizationId,
        ...rest
    } = reqData
    const exitsOrganization =
        await organizationModels.findOrganizationById(organizationId)
    if (!exitsOrganization) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found')
    }
    if (exitsOrganization.isActive === false) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            'Organization is not active'
        )
    }
    const fullName = `${reqData.firstName} ${reqData.lastName}`.trim()
    const user = await authModels.findAccountById(userId)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

    const { key } = await S3StorageCvFile.streamUploadFile(
        buffer,
        originalname,
        'cvs'
    )
    const upperGender = gender.toUpperCase()
    const newCandidateProfile = {
        ...rest,
        cvKeyS3: key,
        userId,
        firstName,
        lastName,
        fullName,
        gender: upperGender,
        organizationId
    }
    const createNewCandidateProfile =
        await candidateProfileModels.createNewCandidateProfile(
            newCandidateProfile
        )

    return createNewCandidateProfile
}
