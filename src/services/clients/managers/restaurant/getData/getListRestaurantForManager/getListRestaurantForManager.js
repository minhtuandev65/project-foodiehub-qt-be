import { restaurantModels } from '~/models/restaurant'

export const getListRestaurantForManager = async (userId) => {
    try {
        const result =
            await restaurantModels.getListRestaurantForManager(userId)

        const restaurantList = result.restaurantList.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString('vi-VN')
        }))

        return {
            ...result,
            restaurantList
        }
    } catch (error) {
        throw new Error(error)
    }
}
