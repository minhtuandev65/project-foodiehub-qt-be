import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const favorite = async (restaurantId, userId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.FAVORITES)
            .findOne({
                restaurantId: new ObjectId(restaurantId),
                userId: new ObjectId(userId),
                favorite: true
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
