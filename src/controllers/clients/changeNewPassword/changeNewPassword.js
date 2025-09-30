import { StatusCodes } from 'http-status-codes'
import { clientsServices } from '~/services/clients'
import ApiError from '~/utils/ApiError'

export const changePassword = async (req, res) => {
    try {
        const { t } = req
        let userId = req.payload._id
        const reqData = { userId, ...req.body }
        const data = await clientsServices.changePassword(reqData, t)
        res.status(StatusCodes.OD).json({
            status: t('success'),
            message: t('successChangePassword'),
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
