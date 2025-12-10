import { models } from '~/models'

export const list = async (userId, filter) => {
    const existStaff = await models.staff.find.id(String(userId))
    if (!existStaff) {
        return {
            status: 'error',
            message: 'Staff not found',
            data: { data: [], total: 0, page: 1, limit: 0 }
        }
    }

    const {
        tableList = [],
        total = 0,
        page = 1,
        limit = 30
    } = await models.table.staff.data.list(String(existStaff.restaurantId))

    // Không gọi models.bookTable.find.tableId trên tableList (mảng) — bỏ existBooking

    const listTable = await Promise.all(
        tableList.map(async (item) => {
            // Lấy bookingRaw (có thể là object hoặc array)
            const bookingRaw = await models.bookTable.find.tableId(
                String(item._id)
            )
            const booking = Array.isArray(bookingRaw)
                ? bookingRaw[0]
                : bookingRaw

            // Mặc định
            let existCart = null
            let existCartItem = null
            // Nếu có booking, mới query cart liên quan
            if (booking && booking._id) {
                existCart = await models.cart.find.bookTableId(
                    String(booking._id)
                )
                if (existCart && existCart._id) {
                    existCartItem = await models.cart.cartItems.find.cartId(
                        String(existCart._id)
                    )
                }
            }
            let cartId = null
            let itemStatus = 3

            if (Array.isArray(existCartItem)) {
                if (existCartItem.length > 0) {
                    itemStatus = existCartItem[0].status ?? itemStatus
                    cartId = existCart._id ?? null
                }
            } else if (existCartItem) {
                itemStatus = existCartItem.status ?? itemStatus
                cartId = existCart._id ?? null
            }

            const plainItem = item && item.toObject ? item.toObject() : item

            return {
                ...plainItem,
                isBooked: !!(booking && Number(booking.status) === 1),
                date: booking ? booking.date : null,
                time: {
                    startTime: booking ? booking.startTime : null,
                    endTime: booking ? booking.endTime : null
                },
                bookOffline: booking ? booking.bookOffline : null,
                bookTableId: booking ? booking._id : null,
                status: itemStatus,
                cartId
            }
        })
    )

    return {
        data: listTable,
        total,
        page,
        limit
    }
}
