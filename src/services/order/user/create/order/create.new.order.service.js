/* Service */
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'
const ensureMenusExist = async (menuIds, restaurantId, t) => {
    if (!Array.isArray(menuIds) || menuIds.length === 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, t('menu.emptyMenuIds'))
    }

    // loại trùng để so khớp chính xác
    const uniqueStrIds = [...new Set(menuIds)]
    const objIds = uniqueStrIds.map((s) => new ObjectId(s))

    const col = await config.mongo
        .GET_DB()
        .collection(helpers.mongo.collectionName.MENU)
    const docs = await col
        .find({
            _id: { $in: objIds },
            _destroy: { $ne: true },
            isActive: { $ne: false },
            restaurantId: new ObjectId(restaurantId)
        })
        .project({ _id: 1 })
        .toArray()

    const found = new Set(docs.map((d) => d._id.toString()))
    const missing = uniqueStrIds.filter(
        (sid) => !found.has(new ObjectId(sid).toString())
    )
    if (missing.length) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            t('menu.notFoundSomeIds', { ids: missing.join(', ') })
        )
    }

    // Trả về đúng thứ tự như input nếu bạn cần
    return uniqueStrIds
}
export const order = async (newOrderData, t) => {
    try {
        const { userId, restaurantId, tableId, items, ...rest } = newOrderData

        const [existUser, existRestaurant, existTable] = await Promise.all([
            models.auth.find.accountById(userId),
            models.restaurant.find.id(restaurantId),
            models.table.find.id(tableId)
        ])

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
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))
        if (!existUser.isActive)
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                t('user.emailNotActivated')
            )
        if (String(existTable.restaurantId) !== String(existRestaurant._id)) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('table.notBelongToRestaurant')
            )
        }
        // Lấy danh sách menuId từ items
        if (!Array.isArray(items) || items.length === 0) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                t('order.itemsRequired')
            )
        }
        const menuIdsFromItems = [...new Set(items.map((it) => it.menuId))]

        // Chỉ kiểm tra tồn tại (không ép cách lưu)
        const verifiedMenuIds = await ensureMenusExist(
            menuIdsFromItems,
            restaurantId,
            t
        )

        const newOrder = {
            userId: String(existUser._id),
            restaurantId: String(existRestaurant._id),
            tableId: String(existTable._id),
            items,
            ...rest
        }

        const result = await models.orders.user.create.order(
            newOrder,
            verifiedMenuIds
        )

        return { _id: result.insertedId, ...newOrder }
    } catch (error) {
        throw Error(error)
    }
}
