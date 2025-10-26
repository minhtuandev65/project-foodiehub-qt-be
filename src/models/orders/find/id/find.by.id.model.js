import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const id = async (orderId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.ORDER)
            .findOne({
                _id: new ObjectId(orderId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
