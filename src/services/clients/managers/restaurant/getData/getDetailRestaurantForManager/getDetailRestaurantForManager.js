import { restaurantModels } from '~/models/restaurant'

export const getDetailRestaurantForManager = async (restaurantId) => {
    try {
        const result = await restaurantModels.getDetailRestaurantForManager(restaurantId)

        return result
    } catch (error) {
        throw new Error(error)
    }
}
