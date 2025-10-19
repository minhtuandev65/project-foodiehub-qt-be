import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { env } from '~/config/env/environment'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const authenticate = async (req, res) => {
    try {
        const { t } = req
        const reqData = req.body
        const authenticated = await services.auth.authenticate(reqData, t)
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
            status: 'success',
            message: t('auth.loginSuccess', {
                email: req.body.email
            }),
            data: authenticated
        })
    } catch (error) {
        const { t } = req
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                status: 'error',
                message: error.message // message trong ApiError có thể cũng dùng i18n
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: error.message || 'Internal Server Error'
            })
        }
    }
}
