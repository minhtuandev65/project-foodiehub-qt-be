import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const refreshToken = async (req, res) => {
    try {
        const { t } = req
        const data = await services.auth.refreshToken(req.cookies?.refreshToken)
        // Tra ve cookie accessToken moi sau khi da refresh thanh cong
        res.cookie('accessToken', data.accessToken, {
            httpOnly: true,
            secure: true,
            sampleSite: 'none',
            maxAge: ms('2 days')
        })
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('auth.refreshTokenSuccessfully'),
            data
        })
    } catch (error) {
        const { t } = req
        // next(new ApiError(StatusCodes.FORBIDDEN, t('errorRefreshToken')))
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
