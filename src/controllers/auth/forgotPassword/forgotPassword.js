import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'
import ApiError from '~/utils/ApiError'

export const forgotPassword = async (req, res) => {
    try {
        const { t } = req
        if (!req.body.email) {
            throw new ApiError(StatusCodes.BAD_REQUEST, t('emailIsRequired'))
        }
        const reqData = req.body
        const data = await authServices.forgotPassword(reqData, t)

        res.status(StatusCodes.CREATED).json({
            status: t('success'),
            message: t('auth.forgotPasswordEmailSent', {
                role: req.body.role.toUpperCase(),
                email: req.body.email
            }),
            data
        })
    } catch (error) {
        const { t } = req
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
