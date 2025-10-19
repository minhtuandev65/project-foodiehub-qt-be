import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/env/environment'
import { models } from '~/models'
export const authenticate = async (reqData, t) => {
    const existUser = await models.auth.find.accountByEmail(reqData.email)

    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, t('auth.accountNotFound'))

    if (!existUser.isActive)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('user.emailNotActivated')
        )
    if (existUser._destroy === true) {
        throw new ApiError(
            StatusCodes.LOCKED,
            t('user.yourAccountHasBeenBlocked')
        )
    }
    if (!bcrypt.compareSync(reqData.password, existUser.password)) {
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('auth.yourEmailOrPasswordIsIncorrect')
        )
    }

    const userInfo = {
        _id: existUser._id,
        email: existUser.email,
        role: existUser.role
    }

    const accessToken = await JwtProvider.generateToken(
        userInfo,
        env.ACCESS_TOKEN_SECRET_SIGNATURE,
        env.ACCESS_TOKEN_LIFE
    )
    const refreshToken = await JwtProvider.generateToken(
        userInfo,
        env.REFRESH_TOKEN_SECRET_SIGNATURE,
        env.REFRESH_TOKEN_LIFE
    )
    await models.auth.update.updateLatestActiveEmail(existUser._id)
    return { ...userInfo, accessToken, refreshToken }
}
