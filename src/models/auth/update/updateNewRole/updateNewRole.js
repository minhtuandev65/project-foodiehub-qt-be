import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { USER_COLLECTION_NAME } from '~/helpers'

export const updateNewRole = async (userId, role) => {
    try {
        return await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .updateOne(
                {
                    _id: new ObjectId(userId)
                },
                {
                    $set: { role: role }
                }
            )
    } catch (error) {
        throw new Error(error)
    }
}
