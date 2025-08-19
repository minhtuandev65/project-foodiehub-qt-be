import { RESTAURANT_COLLECTION_SCHEMA } from '../restaurantModel/restaurantModel'

export const validateBeforeCreateRestaurant = async (data) => {
    return await RESTAURANT_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
