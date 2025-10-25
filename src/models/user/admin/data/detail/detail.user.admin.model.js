import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'
export const detail = async (userId) => {
    try {
        const pipeline = [
            {
                $match: {
                    _destroy: false,
                    _id: new ObjectId(userId)
                }
            },
            {
                $project: {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    fullName: 1,
                    role: 1,
                    avatar: 1,
                    gender: 1,
                    isActive: 1,
                    _destroy: 1,
                    createaAt: 1,
                    updatedAt: 1,
                    latestActiveAt: 1
                }
            }
        ]

        const userDetail = await GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .aggregate(pipeline)
            .toArray()

        return userDetail[0] || null
    } catch (error) {
        throw new Error(error)
    }
}
