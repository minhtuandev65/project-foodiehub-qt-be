import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { INVALID_UPDATE_FIELDS_USER, USER_COLLECTION_NAME } from '~/helpers'

export const updateProfileUser = async (userId, updatedData) => {
    try {
        Object.keys(updatedData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS_USER.includes(fieldName)) {
                delete updatedData[fieldName]
            }
        })
        const exist = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(userId),
                    _destroy: false
                },
                { $set: { ...updatedData, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
