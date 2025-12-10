import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const list = async (userId, t) => {
    const result = await models.bookTable.user.data.list(userId)
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, t('You have not book table'))
    }

    const bookTableList = result.bookTableList || []

    const exsitRestaurant = await Promise.all(
        bookTableList.map(async (item) => {
            const dataRes = await models.restaurant.find.id(
                String(item.restaurantId)
            )
            // lấy bảng theo restaurantId trả về
            const dataTable = await models.table.find.restaurantId(
                String(dataRes._id)
            )

            // lấy cart có thể trả về object hoặc id string — chuẩn hóa thành cartId string
            const dataCart = await models.cart.find.bookTableId(
                String(item._id)
            )
            // nếu dataCart là object có _id, dùng _id; nếu là chuỗi id, dùng luôn
            const cartId =
                dataCart == null
                    ? null
                    : typeof dataCart === 'string'
                      ? dataCart
                      : String(dataCart._id ?? dataCart)
            const rawCartItems = cartId
                ? await models.cart.cartItems.find.cartId(String(cartId))
                : null
            const dataCartItems = rawCartItems
                ? Array.isArray(rawCartItems)
                    ? rawCartItems
                    : [rawCartItems] // nếu là object → đưa vào mảng
                : []
            let statusCartItem = 3
            if (Array.isArray(dataCartItems) && dataCartItems.length > 0) {
                const statuses = dataCartItems.map((it) => Number(it?.status))
                statusCartItem = Math.max(...statuses)
            }
            return {
                ...item,
                restaurantName: dataRes?.name || null,
                categories: dataTable?.categories || 1,
                statusCartItem,
                tableName: dataTable?.name || null,
                bookTableId: String(item._id),
                tableId: String(dataTable._id)
            }
        })
    )

    return {
        ...result,
        bookTableList: exsitRestaurant
    }
}
