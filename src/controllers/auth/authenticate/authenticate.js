import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { env } from '~/config/environment'
import { authServices } from '~/services/auth'

export const authenticate = async (req, res, next) => {
    try {
        const reqData = req.body
        const authenticated = await authServices.authenticate(reqData)
        const isProduction = env.BUILD_MODE === 'production'
        res.cookie('accessToken', authenticated.accessToken, {
            httpOnly: true,
            secure: isProduction, // bỏ secure khi dev local http
            sameSite: isProduction ? 'None' : 'lax', // dev local không cần none
            maxAge: ms('2 days')
        })
        res.cookie('refreshToken', authenticated.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'lax',
            maxAge: ms('2 days')
        })

        res.status(StatusCodes.OK).json({
            message: 'Login successfully',
            data: authenticated
        })
    } catch (error) {
        next(error)
    }
}
