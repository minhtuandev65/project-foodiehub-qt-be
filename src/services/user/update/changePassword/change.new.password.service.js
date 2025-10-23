import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import { models } from '~/models'
export const changeNewPassword = async (reqData, t) => {
    const { userId, oldPassword, newPassword } = reqData

    const existUser = await models.user.data.existUserPassword(userId)
    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('auth.accountNotFound'))

    if (!existUser.isActive)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('user.emailNotActivated')
        )
    if (!bcrypt.compareSync(oldPassword, existUser.password)) {
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('auth.yourEmailOrPasswordIsIncorrect')
        )
    }
    const data = {
        userId,
        password: await bcrypt.hash(newPassword, 8)
    }

    const user = await models.auth.update.updateNewPassword(data)

    return user
}
