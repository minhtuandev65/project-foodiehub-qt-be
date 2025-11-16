import { models } from '~/models'

export const commentRestaurant = async (data) => {
    return await models.restaurant.COMMENT_RESTAURANT_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
