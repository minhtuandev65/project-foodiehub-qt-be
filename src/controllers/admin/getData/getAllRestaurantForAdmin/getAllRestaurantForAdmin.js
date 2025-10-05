import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/clients/managers/restaurant'
import ApiError from '~/utils/ApiError'

export const getAllRestaurantForAdmin = async (req, res) => {
    try {
        const { t } = req

        const data =
            await restaurantServices.getAllRestaurantForAdmin()

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
