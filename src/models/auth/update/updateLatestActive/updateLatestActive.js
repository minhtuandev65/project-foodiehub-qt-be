import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { USER_COLLECTION_NAME } from '~/helpers'

export const updateLatestActiveEmail = async (userId) => {
    try {
        const result = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(userId) },
                {
                    $set: {
                        latestActiveAt: new Date()
                    }
                }
            )

        return result
    } catch (error) {
        throw new Error(error)
    }
}
