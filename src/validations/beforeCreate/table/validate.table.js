import { models } from '~/models'

export const table = async (data) => {
    return await models.table.TABLE_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
