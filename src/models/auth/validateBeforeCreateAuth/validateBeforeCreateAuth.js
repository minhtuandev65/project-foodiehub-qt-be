import { USER_COLLECTION_SCHEMA } from '../authModel/authModel'

export const validateBeforeCreateAuth = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
