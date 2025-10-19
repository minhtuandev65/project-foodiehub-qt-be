import dayjs from 'dayjs'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/env/environment'
import { JwtProvider } from '~/providers/JwtProvider'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import passwordResetSuccessTemplate from '~/template/auth/resetPasswordSuccessTemplate/reset.password.success.template'
import { APP_LOGO, WEBSITE_DOMAIN } from '~/utils/constants'
import { ResendProvider } from '~/providers/ResendProvider'
import { models } from '~/models'
import { templates } from '~/template'

export const resetNewPassword = async (reqData, t) => {
    const resetPasswordTokenDecoded = await JwtProvider.verifyToken(
        reqData.token,
        env.ACCESS_TOKEN_SECRET_SIGNATURE
    )
    const email = resetPasswordTokenDecoded.email
    const existUser = await models.auth.find.accountByEmail(email)
    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('auth.accountNotFound'))

    if (!existUser.isActive)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('user.emailNotActivated')
        )
    if (
        existUser.resetPasswordToken !== reqData.token ||
        dayjs().isAfter(existUser.resetPasswordExpired)
    )
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            t('auth.invalidTokenOrResetPasswordRequestExpired')
        )
    const updatedUser = {
        password: await bcrypt.hash(reqData.newPassword, 8),
        resetPasswordToken: null,
        resetPasswordExpired: null
    }
    await models.auth.update.updateNewPassword(existUser._id, updatedUser)
    const passwordResetSuccessMailTemplate =
        templates.auth.passwordResetSuccessTemplate({
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
}
