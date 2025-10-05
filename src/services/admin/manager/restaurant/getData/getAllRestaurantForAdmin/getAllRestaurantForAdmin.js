import { restaurantModels } from "~/models/clients/manager/restaurant"


export const getAllRestaurantForAdmin = async () => {
    try {
        const result =
            await restaurantModels.getAllRestaurantForAdmin()

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
