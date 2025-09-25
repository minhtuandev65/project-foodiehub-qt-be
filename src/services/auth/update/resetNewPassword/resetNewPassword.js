import dayjs from 'dayjs'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { authModels } from '~/models/auth'
import { JwtProvider } from '~/providers/JwtProvider'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import passwordResetSuccessTemplate from '~/template/auth/resetPasswordSuccessTemplate'
import { APP_LOGO, WEBSITE_DOMAIN } from '~/utils/constants'
import { ResendProvider } from '~/providers/ResendProvider'

export const resetNewPassword = async (reqData) => {
    try {
        const resetPasswordTokenDecoded = await JwtProvider.verifyToken(
            reqData.token,
            env.ACCESS_TOKEN_SECRET_SIGNATURE
        )
        const email = resetPasswordTokenDecoded.email

        const existUser = await authModels.findAccountByEmail(email)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Your account is not active!'
            )
        if (
            existUser.resetPasswordToken !== reqData.token ||
            dayjs().isAfter(existUser.resetPasswordExpired)
        )
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                'Invalid token or reset password request expired'
            )
        const updatedUser = {
            password: await bcrypt.hash(reqData.newPassword, 8),
            resetPasswordToken: null,
            resetPasswordExpired: null
        }
        await authModels.updateNewPassword(existUser._id, updatedUser)
        const passwordResetSuccessMailTemplate = passwordResetSuccessTemplate({
            username: existUser.email,
            loginUrl: `${WEBSITE_DOMAIN}/login`,
            year: dayjs().year(),
            APP_LOGO: APP_LOGO
        })
        await ResendProvider.sendMail(
            existUser.email,
            'Reset password success notification email',
            passwordResetSuccessMailTemplate
        )
        return email
    } catch (error) {
        throw Error(error)
    }
}
