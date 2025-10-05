import { STAFF_COLLECTION_SCHEMA } from "../staffModel/staffModel"


export const validateBeforeCreateStaff = async (data) => {
    return await STAFF_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
