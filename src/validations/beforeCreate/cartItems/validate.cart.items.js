import { models } from '~/models'

export const cartItems = async (data) => {
    return await models.cart.CART_ITEMS_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
