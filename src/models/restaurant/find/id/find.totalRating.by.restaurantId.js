import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const totalRatingByRestaurant = async (restaurantId) => {
    try {
        const result = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.RATING_RESTAURANT)
            .aggregate([
                {
                    $match: {
                        restaurantId: new ObjectId(restaurantId)
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalRating: { $sum: "$rating" }
                    }
                }
            ])
            .toArray()

        return result[0]?.totalRating || 0
    } catch (error) {
        throw new Error(error)
    }
}
