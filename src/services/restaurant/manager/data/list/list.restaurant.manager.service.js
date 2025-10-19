import { models } from '~/models'

export const list = async (userId) => {
    const result = await models.restaurant.manager.data.list(userId)
    const restaurantList = result.restaurantList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        restaurantList
    }
}
