import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import { clientsModels } from '~/models/clients'
import { authModels } from '~/models/auth'
export const changePassword = async (reqData, t) => {
    try {
        const { userId, oldPassword, newPassword } = reqData

        const existUser = await clientsModels.existUserPassword(userId)
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
        const user = await authModels.updateNewPassword({
            userId,
            password: await bcrypt.hash(newPassword, 8)
        })
        return user
    } catch (error) {
        throw Error(error)
    }
}
