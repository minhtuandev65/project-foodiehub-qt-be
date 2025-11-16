import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'

export const restaurantFavoritesOfUser = async ({ userId, restaurantId }) => {
    try {
        const pipeline = [
            {
                $match: {
                    userId: new ObjectId(userId),
                    restaurantId: new ObjectId(restaurantId),
                    favorite: true
                }
            },
            {
                $project: {
                    favorite: 1
                }
            }
        ]

        const result = await GET_DB()
            .collection(helpers.mongo.collectionName.FAVORITES)
            .aggregate(pipeline)
            .toArray()

        return result[0] || null
    } catch (error) {
        throw new Error(error)
    }
}
