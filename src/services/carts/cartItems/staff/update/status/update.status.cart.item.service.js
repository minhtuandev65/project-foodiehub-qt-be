/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const status = async (cartId, t) => {
    try {
        //B1: Tìm cart item theo cartId
        const existCartItems = await models.cart.cartItems.find.cartId(
            String(cartId)
        )
        //B2: Kiểm tra cart item có tồn tại không
        if (!existCartItems)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                t('cart.cartItemsNotFound')
            )
        const data = {
            cartId,
            status: 1
        }
        const result = await models.cart.cartItems.update.status(data)

        return result
    } catch (error) {
        throw Error(error)
    }
}
