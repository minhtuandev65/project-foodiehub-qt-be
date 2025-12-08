import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const id = async (cartItemsId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CART_ITEMS)
            .findOne({
                _id: new ObjectId(cartItemsId),
                _destroy: false
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
