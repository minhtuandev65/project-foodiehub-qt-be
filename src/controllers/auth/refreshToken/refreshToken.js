import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { authServices } from '~/services/auth'
import ApiError from '~/utils/ApiError'

export const refreshToken = async (req, res, next) => {
    try {
        const result = await authServices.refreshToken(
            req.cookies?.refreshToken
        )
        // Tra ve cookie accessToken moi sau khi da refresh thanh cong
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sampleSite: 'none',
            maxAge: ms('2 days')
        })
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        const { t } = req
        next(new ApiError(StatusCodes.FORBIDDEN, t('errorRefreshToken')))
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                status: t('error'),
                message: error.message // message trong ApiError có thể cũng dùng i18n
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: t('error'),
                message: error.message || 'Internal Server Error'
            })
        }
    }
}
