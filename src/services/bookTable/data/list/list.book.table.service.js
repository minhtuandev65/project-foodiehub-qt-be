import { models } from '~/models'

export const list = async (restaurantId, tableId) => {
    const result = await models.bookTable.data.list(restaurantId, tableId)

    const bookTableList = result.bookTableList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        bookTableList
    }
}
