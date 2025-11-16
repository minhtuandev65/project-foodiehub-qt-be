import { models } from '~/models'

export const carts = async (data) => {
    return await models.cart.CARTS_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
