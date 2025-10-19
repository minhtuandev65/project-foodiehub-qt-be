import dayjs from 'dayjs'
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { env } from '~/config/env/environment'
import { models } from '~/models'
import { JwtProvider } from '~/providers/JwtProvider'
import { ResendProvider } from '~/providers/ResendProvider'
import { templates } from '~/template'
import ApiError from '~/utils/ApiError'
import { APP_LOGO, WEBSITE_DOMAIN } from '~/utils/constants'

export const forgotPassword = async (reqData, t) => {
    const existUser = await models.auth.find.accountByEmail(reqData.email)

    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('auth.accountNotFound'))

    if (!existUser.isActive)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('user.emailNotActivated')
        )

    const userInfo = {
        _id: existUser._id,
        email: existUser.email
    }

    const token = await JwtProvider.generateToken(
        userInfo,
        env.ACCESS_TOKEN_SECRET_SIGNATURE,
        env.FORGOT_PASSWORD_TOKEN_LIFE
    )

    const confirmationLink = `${WEBSITE_DOMAIN}/account/resetPassword?token=${token}`
    console.log(confirmationLink)
    await models.auth.update.updateProfileUser(existUser._id, {
        resetPasswordToken: token,
        resetPasswordExpired: dayjs()
            .add(ms(env.FORGOT_PASSWORD_TOKEN_LIFE) + 10000, 'millisecond')
            .toDate()
    })

    const forgotPasswordMailTemplate = templates.auth.forgotPasswordTemplate({
        APP_LOGO: APP_LOGO,
        confirmationLink: confirmationLink,
        FORGOT_PASSWORD_TOKEN_LIFE: env.FORGOT_PASSWORD_TOKEN_LIFE,
        year: dayjs().year()
    })

    await ResendProvider.sendMail(
        existUser.email,
        'Forgot password confirmation email',
        forgotPasswordMailTemplate
    )
    return true
}
