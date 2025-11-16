import { models } from '~/models'

export const ratingRestaurant = async (data) => {
    return await models.restaurant.RATING_RESTAURANT_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
