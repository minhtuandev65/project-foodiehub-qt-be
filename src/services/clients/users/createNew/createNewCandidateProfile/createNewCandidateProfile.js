import { StatusCodes } from 'http-status-codes'
import { S3StorageCvFile } from '~/middlewares/S3StorageMiddleware/uploadFileS3'
import { authModels } from '~/models/auth'
import { candidateProfileModels } from '~/models/candidateProfile'
import { restaurantModels } from '~/models/restaurant'
import ApiError from '~/utils/ApiError'

export const createNewCandidateProfile = async (reqData) => {
    const {
        userId,
        file,
        firstName,
        lastName,
        gender,
        restaurantId,
        skills,
        ...rest
    } = reqData
    const exitsOrganization =
        await restaurantModels.findRestaurantById(restaurantId)
    if (!exitsOrganization) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Restaurant not found')
    }
    if (exitsOrganization.isActive === false) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Restaurant is not active')
    }
    const fullName = `${reqData.firstName} ${reqData.lastName}`.trim()

    const user = await authModels.findAccountById(userId)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    const { key } = await S3StorageCvFile.streamUploadFile(file, 'cvs', userId)
    const upperGender = gender.toUpperCase()
    const newCandidateProfile = {
        ...rest,
        cvKeyS3: key,
        userId,
        firstName,
        lastName,
        fullName,
        gender: upperGender,
        restaurantId,
        skills: JSON.parse(skills)
    }
    const createNewCandidateProfile =
        await candidateProfileModels.createNewCandidateProfile(
            newCandidateProfile
        )

    return createNewCandidateProfile
}
