import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const cartItems = async (cartId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CART_ITEMS)
            .findOne({
                cartId: new ObjectId(cartId),
                _destroy: false
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
