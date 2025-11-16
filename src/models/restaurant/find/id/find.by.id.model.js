import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const id = async (restaurantId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.RESTAURANTS)
            .findOne({
                _id: new ObjectId(restaurantId),
                _destroy: false
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
