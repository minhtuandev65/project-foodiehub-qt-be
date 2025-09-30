import { restaurantModels } from '~/models/restaurant'

export const getListRestaurantForManager = async (userId) => {
    try {
        const result =
            await restaurantModels.getListRestaurantForManager(userId)

        return result
    } catch (error) {
        throw new Error(error)
    }
}
