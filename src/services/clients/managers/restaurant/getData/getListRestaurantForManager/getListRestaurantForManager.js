import { restaurantModels } from '~/models/clients/manager/restaurant'

export const getListRestaurantForManager = async (userId) => {
    const result = await restaurantModels.getListRestaurantForManager(userId)

    const restaurantList = result.restaurantList.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
    }))

    return {
        ...result,
        restaurantList
    }
}
