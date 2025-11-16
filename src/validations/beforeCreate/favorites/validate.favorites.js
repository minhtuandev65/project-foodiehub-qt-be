import { models } from '~/models'

export const favorites = async (data) => {
    return await models.favorites.FAVORITES_COLLECTION_SCHEMA.validateAsync(
        data,
        {
            abortEarly: false
        }
    )
}
