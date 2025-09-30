import { StatusCodes } from 'http-status-codes'
import { restaurantServices } from '~/services/clients/managers/restaurant'
import ApiError from '~/utils/ApiError'

export const getDetailRestaurantForManager = async (req, res) => {
    try {
        const { t } = req
        const restaurantId = req.params.restaurantId
        const data = await restaurantServices.getDetailRestaurantForManager(restaurantId)
        res.status(StatusCodes.OK).json({
            status: t('success'),
            message: t('managers.getDetailRestaurantSuccessfully'),
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
