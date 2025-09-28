import { restaurantModels } from '~/models/restaurant'

export const getDetailRestaurant = async (restaurantId) => {
    try {
        const result = await restaurantModels.getDetailRestaurant(restaurantId)

        return result
    } catch (error) {
        throw new Error(error)
    }
}
