import { models } from "~/models"

export const list = async () => {
    const result = await models.restaurant.admin.data.list()
    const restaurantList = result.restaurantList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        restaurantList
    }
}