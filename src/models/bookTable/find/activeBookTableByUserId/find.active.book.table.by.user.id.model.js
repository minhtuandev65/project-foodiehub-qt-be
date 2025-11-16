import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const activeBookTableByUserId = async (userId, restaurantId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.BOOK_TABLE)
            .findOne({
                userId: new ObjectId(userId),
                restaurantId: new ObjectId(restaurantId),
                _destroy: false
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
