import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { USER_COLLECTION_NAME } from '~/helpers'

export const getMyProfile = async (id) => {
    try {
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ]
        const user = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()

        return user
    } catch (error) {
        throw new Error(error)
    }
}
