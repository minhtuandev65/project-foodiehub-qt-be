import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { env } from '~/config/environment'
import { authServices } from '~/services/auth'

export const authenticate = async (req, res, next) => {
    try {
        const authenticated = await authServices.authenticate(req.body)
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

        const { _id, email, ...data } = authenticated
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        next(error)
    }
}
