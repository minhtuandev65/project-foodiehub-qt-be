import { StatusCodes } from 'http-status-codes'
import { authServices } from '~/services/auth'
import ApiError from '~/utils/ApiError'

export const createNewAccount = async (req, res) => {
    try {
        const { t } = req
        const reqData = req.body
        const createNew = await authServices.createNewAccount(reqData)

        const { verifyToken, ...data } = createNew
        res.status(StatusCodes.CREATED).json({
            status: t('success'),
            message: t('auth.createNewAccountSuccessfully'),
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
