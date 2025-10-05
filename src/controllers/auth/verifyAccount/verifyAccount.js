import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'
import ApiError from '~/utils/ApiError'

export const verifyAccount = async (req, res) => {
    try {
        const { t } = req
        const data = await authServices.verifyAccount(req.body, t)

        res.status(StatusCodes.OK).json({
            status: t('success'),
            message: t('auth.verifyAccountSuccess', {
                email: data
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
