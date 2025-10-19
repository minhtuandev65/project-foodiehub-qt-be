import { models } from '~/models'

export const staff = async (data) => {
    return await models.staff.STAFF_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
