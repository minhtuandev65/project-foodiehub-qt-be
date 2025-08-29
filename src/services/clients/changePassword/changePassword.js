import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import { clientsModels } from '~/models/clients'
import { authModels } from '~/models/auth'
export const changePassword = async (reqData) => {
    try {
        const { userId, oldPassword, newPassword } = reqData

        const existUser = await clientsModels.existUserPassword(userId)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Your account is not active!'
            )
        if (!bcrypt.compareSync(oldPassword, existUser.password)) {
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Your password is incorrect!'
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
