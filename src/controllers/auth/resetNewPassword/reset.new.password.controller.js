import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const resetNewPassword = async (req, res) => {
    try {
        const { t } = req
        if (!req.body.token) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'token is required')
        }

        if (!req.body.newPassword || req.body.newPassword?.length < 7) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                'Password is required, must be at least 7 characters'
            )
        }
        const reqData = req.body
        const data = await services.auth.resetNewPassword(reqData, t)

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('auth.resetPasswordSuccess'),
            data
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
