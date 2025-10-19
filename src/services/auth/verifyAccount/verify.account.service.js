import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const verifyAccount = async (reqBody, t) => {
    const emailValue = reqBody.email

    const existUser = await models.auth.find.accountByEmail(emailValue)

    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('auth.accountNotFound'))

    if (existUser.isActive)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('user.emailNotActivated')
        )

    if (reqBody.token !== existUser.verifyToken) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Token invalid')
    }
    const updatedData = {
        isActive: true,
        verifyToken: reqBody.token
    }

    const updatedUser = await models.auth.update.updateLatestActiveEmail(
        existUser._id,
        updatedData
    )

    return updatedUser.email
}
