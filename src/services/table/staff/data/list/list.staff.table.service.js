import { models } from '~/models'

export const list = async (userId, filter) => {
    const existStaff = await models.staff.find.id(String(userId))
    const { tableList, total, page, limit } =
        await models.table.staff.data.list(String(existStaff.restaurantId))

    return {
        data: tableList || [],
        total,
        page,
        limit
    }
}
