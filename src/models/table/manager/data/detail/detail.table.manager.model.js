import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'

export const detail = async (restaurantId) => {
    try {
        const pipeline = [
            {
                $match: {
                    _destroy: false,
                    _id: new ObjectId(restaurantId)
                }
            },
            {
                $project: {
                    _id: 1,
                    creatorId: 1,
                    restaurantId: 1,
                    imageURL: 1,
                    name: 1,
                    categories: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAt: 1,
                }
            }
        ]

        const tableDetail = await GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .aggregate(pipeline)
            .toArray()

        return tableDetail[0] || null
    } catch (error) {
        throw new Error(error)
    }
}
