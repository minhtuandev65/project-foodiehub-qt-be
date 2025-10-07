import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import {
    INVALID_UPDATE_FIELDS_STAFF,
    STAFF_RESTAURANT_COLLECTION_NAME
} from '~/helpers'

export const updateStaff = async (staffId, newUpdateData) => {
    try {
        Object.keys(newUpdateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS_STAFF.includes(fieldName)) {
                delete newUpdateData[fieldName]
            }
        })

        const exist = await GET_DB()
            .collection(STAFF_RESTAURANT_COLLECTION_NAME)
            .findOneAndUpdate(
                {
                    userId: new ObjectId(staffId),
                    _destroy: false
                },
                { $set: { ...newUpdateData, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        console.log(staffId)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
