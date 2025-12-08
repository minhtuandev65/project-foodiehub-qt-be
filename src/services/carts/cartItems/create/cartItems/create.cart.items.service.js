/* Service */
import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const cartItems = async (newCartItemsData, t) => {
    try {
        const { userId, restaurantId, menuId, quantity } = newCartItemsData
        const [
            existUser,
            existRestaurant,
            existTable,
            existMenu,
            existBookTable
        ] = await Promise.all([
            models.auth.find.accountById(userId),
            models.restaurant.find.id(restaurantId),
            models.table.find.restaurantId(restaurantId),
            models.menu.find.id(menuId),
            models.bookTable.find.userId(userId)
        ])
        /*
            Giả sử đặt món
            B1: kiểm tra user
            B2: Kiểm tra nhà hàng đã tồn tại hay chưa và có hoạt động không
            B3: kiểm tra bàn có tồn tại trong nhà hàng không
            B4: kiểm tra món có tồn tại trong nhà hàng không
            B5: kiểm tra đặt bàn có thuộc về user không
                => TH 1: Đặt 1 bàn => ok
                => TH 2: Đặt nhiều bàn ( nhưng ở 2 thời điểm khác nhau, bàn trong quá khứ sẽ có _destroy = true, bàn hiện tại sẽ có _destroy = false ) => ok
                => TH 3: Đặt nhiều bàn cùng một lúc thì existBookTable sẽ là mảng => ok
            B6: kiểm tra giỏ hàng có tồn tại không
                => TH 1: Giỏ hàng chứa bookTableId là mảng => cần kiểm tra từng phần tử trong mảng có thuộc về user hay không
            B7: Tạo mới hoặc cập nhật item trong giỏ hàng

        */
        // B1: kiểm tra user có tồn tại không => ok
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))
        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('user.emailNotActivated')
            )
        //  B2: Kiểm tra nhà hàng đã tồn tại hay chưa và có hoạt động không => ok
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

        // B3: kiểm tra bàn có tồn tại trong nhà hàng không => ok
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
        // B4: kiểm tra món có tồn tại trong nhà hàng không
        if (String(existMenu.restaurantId) !== String(existRestaurant._id)) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('menu.notBelongToRestaurant')
            )
        }
        // B5: kiểm tra đặt bàn có thuộc về user không
        const bookTable = Array.isArray(existBookTable)
            ? existBookTable
            : existBookTable
              ? [existBookTable]
              : []
        if (!bookTable.length) {
            throw new ApiError(StatusCodes.NOT_FOUND, t('table.notFound'))
        }
        const allBookTableBelongToUser = bookTable.every(
            (check) => String(check.userId) === String(existUser._id)
        )
        if (!allBookTableBelongToUser && existBookTable._destroy === true) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('bookTable.notBelongToUser')
            )
        }
        // B6: kiểm tra giỏ hàng có tồn tại không
        const existBookTableActive =
            await models.bookTable.find.activeBookTableByUserId(
                userId,
                restaurantId
            )
        const existCart = await models.cart.find.bookTableId(
            String(existBookTableActive._id)
        )
        if (
            String(existBookTableActive._id) !== String(existCart.bookTableId)
        ) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('cart.cartNotBelongToBookTable')
            )
        }

        const newCartItems = {
            cartId: String(existCart._id),
            menuId: String(existMenu._id),
            quantity,
            name: existMenu.name,
            imageURL: existMenu.imageURL,
            price: existMenu.price
        }
        // B7: nếu đã có item trong giỏ hàng thì chỉ update quantity
        const existCartItems = await models.cart.cartItems.find.cartItems(
            String(existCart._id),
            String(existMenu._id)
        )
        if (Number(existMenu.quantity) === 0) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('cart.itemQuantityIsZero')
            )
        }
        if (Number(quantity) > Number(existMenu.quantity)) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('cart.itemQuantityExceedAvailable')
            )
        }
        let data = {
            menuId,
            quantity: existMenu.quantity - quantity
        }
        if (existCartItems) {
            const updateQuantity = await models.cart.cartItems.update.quantity({
                cartItemsId: String(existCartItems._id),
                quantity: existCartItems.quantity + quantity
            })
            await models.menu.update.quantity(data)
            return updateQuantity
        }
        const result =
            await models.cart.cartItems.create.cartItems(newCartItems)
        await models.menu.update.quantity(data)
        return { _id: result.insertedId, ...newCartItems }
    } catch (error) {
        throw Error(error)
    }
}
