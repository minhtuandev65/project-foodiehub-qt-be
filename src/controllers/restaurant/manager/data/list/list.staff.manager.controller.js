import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const listStaff = async (req, res) => {
    try {
        const { t } = req
        const restaurantId = req.params.restaurantId
        const filter = {
            page: req.query.page,
            limit: req.query.limit,
            restaurantId
        }

        const data = await services.restaurant.manager.data.listStaff(filter)

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('managers.getListRestaurantSuccessfully'),
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
