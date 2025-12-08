/* Controller */
import { StatusCodes } from 'http-status-codes'
import { services } from '~/services'
import ApiError from '~/utils/ApiError'

export const decreaseQuantity = async (req, res) => {
    try {
        const { t } = req
        const cartItemsId = req.params.cartItemsId

        const data = await services.carts.cartItems.update.decreaseQuantity(
            cartItemsId,
            t
        )

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: t('successfully'),
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
