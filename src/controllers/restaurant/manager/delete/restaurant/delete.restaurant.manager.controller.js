import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const restaurant = async (req, res) => {
    try {
        const { t } = req
        const restaurantId = req.params.restaurantId

        const data = await services.restaurant.manager.deleting.staff(
            restaurantId,
            t
        )
        const email = data.email
        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('managers.deleteStaffSuccessfully', {
                email: email
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
