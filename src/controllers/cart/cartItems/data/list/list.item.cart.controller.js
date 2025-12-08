import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const list = async (req, res) => {
    try {
        const { t } = req
        const restaurantId = req.params.restaurantId
        const userId = req.payload._id
        const data = await services.carts.cartItems.data.list(
            restaurantId,
            userId
        )

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('user.getListCartItemSuccessfully'),
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
