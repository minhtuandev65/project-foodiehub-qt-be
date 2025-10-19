import { models } from '~/models'

export const auth = async (data) => {
    return await models.auth.USER_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
