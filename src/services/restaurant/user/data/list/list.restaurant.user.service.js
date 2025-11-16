import { models } from '~/models'

export const list = async (filter) => {
    const result = await models.restaurant.user.data.list(filter)
    const restaurantList = result.restaurantList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        restaurantList
    }
}
