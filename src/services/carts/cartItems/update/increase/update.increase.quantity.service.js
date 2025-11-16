/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const cartItems = async (newData, t) => {
    try {
        const { userId, restaurantId, quantity } = newData

        const [
            existBookTable,
            existUser,
            existRestaurant,
            existTable,
            existCart,
            existMenu
        ] = await Promise.all([
            models.bookTable.find.userId(userId),
            models.user.find.id(userId),
            models.restaurant.find.id(restaurantId),
            models.table.find.restaurantId(restaurantId),
            models.cart.find.userId(userId),
            models.menu.find.restaurantId(restaurantId)
        ])
        // check nhà hàng có tồn tại và hoạt động không
        if (!existRestaurant)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                t('managers.restaurantNotFound')
            )
        if (!existRestaurant.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('managers.waitAcceptRestaurant')
            )
        // check user có tồn tài không
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))
        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('user.emailNotActivated')
            )
        // check table
        const tables = Array.isArray(existTable)
            ? existTable
            : existTable
              ? [existTable]
              : []

        if (!tables.length) {
            throw new ApiError(StatusCodes.NOT_FOUND, t('table.notFound'))
        }

        const allTableBelongToRestaurant = tables.every(
            (tbl) => String(tbl.restaurantId) === String(existRestaurant._id)
        )

        if (!allTableBelongToRestaurant) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('table.notBelongToRestaurant')
            )
        }
        // check menu
        const menus = Array.isArray(existMenu)
            ? existMenu
            : existMenu
              ? [existMenu]
              : []

        if (!menus.length) {
            throw new ApiError(StatusCodes.NOT_FOUND, t('menu.notFound'))
        }

        const allMenuBelongToRestaurant = menus.every(
            (m) => String(m.restaurantId) === String(existRestaurant._id)
        )

        if (!allMenuBelongToRestaurant) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('menu.notBelongToRestaurant')
            )
        }
        if (
            String(existBookTable.userId) != String(existUser._id) &&
            existBookTable._destroy === true
        ) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('bookTable.notBelongToUser')
            )
        }
        const newCartItems = {
            cartId: String(existCart._id),
            menuId: String(existMenu._id)
        }
        // nếu đã có item trong giỏ hàng thì chỉ update quantity
        const existCartItems = await models.cart.cartItems.find.cartItems(
            String(existCart._id),
            String(existMenu._id)
        )
        if (existCartItems) {
            const updateQuantity = await models.cart.cartItems.update.quantity({
                cartItemsId: String(existCartItems._id),
                quantity: existCartItems.quantity + quantity
            })

            return updateQuantity
        }
        const result =
            await models.cart.cartItems.create.cartItems(newCartItems)

        return { _id: result.insertedId, ...newCartItems }
    } catch (error) {
        throw Error(error)
    }
}
