import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import {
    INVALID_UPDATE_FIELDS_USER_ACTIVE_EMAIL,
    USER_COLLECTION_NAME
} from '~/helpers'

export const updateLatestActiveEmail = async (userId, updatedData = {}) => {
    try {
        Object.keys(updatedData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS_USER_ACTIVE_EMAIL.includes(fieldName)) {
                delete updatedData[fieldName]
            }
        })
        const result = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(userId), _destroy: false },
                {
                    $set: {
                        ...updatedData,
                        latestActiveAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            )

        return result
    } catch (error) {
        throw new Error(error)
    }
}
