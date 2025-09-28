import { restaurantModels } from '~/models/restaurant'

export const getListRestaurant = async () => {
    try {
        const result = await restaurantModels.getListRestaurant()

        return result
    } catch (error) {
        throw new Error(error)
    }
}
