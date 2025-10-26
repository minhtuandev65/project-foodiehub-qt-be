import { models } from '~/models'

export const order = async (data) => {
    return await models.orders.ORDERS_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
