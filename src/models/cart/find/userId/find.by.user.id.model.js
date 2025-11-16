import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const userId = async (userId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CARTS)
            .findOne({
                userId: new ObjectId(userId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
