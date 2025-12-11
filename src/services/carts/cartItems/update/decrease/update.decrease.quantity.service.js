/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const decreaseQuantity = async (cartItemsId, t) => {
    try {
        //B1: Tìm cart item theo id
        const existCartItems = await models.cart.cartItems.find.id(cartItemsId)
        //B2: Kiểm tra cart item có tồn tại không
        if (!existCartItems)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                t('cart.cartItemsNotFound')
            )
        const data = {
            cartItemsId,
            menuId: String(existCartItems.menuId),
            quantity: Number(existCartItems.quantity) - 1
        }
        const result = await models.cart.cartItems.update.quantity(data)
        const totalPriceItem= Number(result.price*result.quantity)
        return {
            ...result,
            totalPriceItem
        }
    } catch (error) {
        throw Error(error)
    }
}
