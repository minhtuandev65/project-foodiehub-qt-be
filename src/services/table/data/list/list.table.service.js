import { models } from '~/models'

export const list = async (restaurantId, filter) => {
    const { tableList, total, page, limit } =
        await models.table.data.list(restaurantId)
    const restaurant = await models.restaurant.find.id(restaurantId)
    const listTable = tableList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))
    return {
        data: listTable || [],
        total,
        page,
        limit,
        restaurantName: restaurant.name
    }
}
