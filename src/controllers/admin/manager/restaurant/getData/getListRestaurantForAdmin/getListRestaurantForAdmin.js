import { StatusCodes } from 'http-status-codes'
import adminServices from '~/services/admin'
import ApiError from '~/utils/ApiError'

export const getListRestaurantForAdmin = async (req, res) => {
    try {
        const { t } = req

        const data =
            await adminServices.getListRestaurantForAdmin()

        res.status(StatusCodes.OK).json({
            status: t('success'),
            message: t('managers.getListRestaurantSuccessfully'),
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
