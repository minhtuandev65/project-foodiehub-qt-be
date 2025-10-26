/* model connect db */
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const order = async (newOrder, verifiedMenuIds = []) => {
    try {
        // 1) Joi validate ở tầng model (nếu bạn có)
        const valiData = await validations.beforeCreate.order(newOrder)

        // 2) Map string -> ObjectId (dùng verifiedMenuIds nếu truyền vào, fallback từ items)
        const srcIds = verifiedMenuIds.length
            ? [...new Set(verifiedMenuIds)]
            : [...new Set((valiData.items || []).map((it) => it.menuId))]

        const idMap = new Map(srcIds.map((s) => [s, new ObjectId(s)]))

        // 3) Ép items[].menuId -> ObjectId (và có thể ép số liệu nếu cần)
        const itemsWithObjId = (valiData.items || []).map((it) => {
            const oid = idMap.get(it.menuId)
            if (!oid) {
                // Phòng khi service không gửi verifiedMenuIds khớp với items
                throw new Error(`Unverified menuId in items: ${it.menuId}`)
            }
            return {
                ...it,
                menuId: oid,
                // ép kiểu an toàn (tuỳ bạn muốn):
                quantity: Number(it.quantity),
                unitPrice: Number(it.unitPrice)
            }
        })

        // 4) Build tài liệu insert (chuyển các FK -> ObjectId)
        const dataToInsert = {
            ...valiData,
            userId: new ObjectId(valiData.userId ?? valiData.creatorId), // đồng bộ tên trường
            restaurantId: new ObjectId(valiData.restaurantId),
            tableId: new ObjectId(valiData.tableId),
            items: itemsWithObjId,
            // giữ thêm menuIds dạng ObjectId để index/lookup nhanh (tuỳ chọn)
            menuIds: srcIds.map((s) => idMap.get(s)),
            createdAt: new Date(),
            updatedAt: null
        }

        // 5) Chèn vào collection ĐƠN HÀNG (đừng lẫn sang MENU)
        const col = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.ORDER)
        const result = await col.insertOne(dataToInsert)

        return result
    } catch (error) {
        throw new Error(error)
    }
}
