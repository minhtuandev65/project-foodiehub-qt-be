import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const accept = async (req, res) => {
    try {
        const { t } = req
        const restaurantId = req.params.restaurantId
        const data = await services.restaurant.admin.action.accept(
            restaurantId,
            t
        )

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: t('admin.acceptCreateRestaurantSuccess', {
                restaurantName: data.name
            }),
            data
        })
    } catch (error) {
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
