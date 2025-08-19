import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
export const authenticate = async (data) => {
    try {
        const existUser = await authModels.findAccountByEmail(data.email)

        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')

        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Your account is not active!'
            )

        if (!bcrypt.compareSync(data.password, existUser.password)) {
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'Your email or password is incorrect!'
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
        await authModels.updateLatestActiveEmail(existUser._id)
        return { ...userInfo, accessToken, refreshToken }
    } catch (error) {
        throw Error(error)
    }
}
