import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const restaurantId = async (restaurantId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.BOOK_TABLE)
            .findOne({
                restaurantId: new ObjectId(restaurantId),
                _destroy: false
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
