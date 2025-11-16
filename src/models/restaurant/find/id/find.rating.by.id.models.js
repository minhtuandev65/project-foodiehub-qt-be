import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const ratingId = async ({restaurantId , userId}) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.RATING_RESTAURANT)
            .findOne({
                userId: new ObjectId(userId),
                restaurantId: new ObjectId(restaurantId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
