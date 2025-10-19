import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import { authServices } from '~/services/auth'
import ApiError from '~/utils/ApiError'

export const verifyAccount = async (req, res) => {
    try {
        const { t } = req
        const data = await services.auth.verifyAccount(req.body, t)

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('auth.verifyAccountSuccess', {
                email: data
            }),
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
