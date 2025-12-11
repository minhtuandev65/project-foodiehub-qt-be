import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const forgotPassword = async (req, res) => {
    console.log(123)
    try {
        const { t } = req
        if (!req.body.email) {
            throw new ApiError(StatusCodes.BAD_REQUEST, t('emailIsRequired'))
        }
        const reqData = req.body
        const data = await services.auth.forgotPassword(reqData, t)

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('auth.forgotPasswordEmailSent'),
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
