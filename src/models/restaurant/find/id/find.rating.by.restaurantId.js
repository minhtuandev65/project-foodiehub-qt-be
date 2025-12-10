import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const ratingByRestaurantId = async ( restaurantId ) => {
    console.log(restaurantId)
    try {
        const count = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.RATING_RESTAURANT)
            .countDocuments({
                restaurantId: new ObjectId(restaurantId)
            })
        return count
    } catch (error) {
        throw new Error(error)
    }
}

