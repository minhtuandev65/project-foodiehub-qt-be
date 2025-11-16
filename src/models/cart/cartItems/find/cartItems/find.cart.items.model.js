import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const cartItems = async (cartId, menuId) => {
    try {
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CART_ITEMS)
            .findOne({
                cartId: new ObjectId(cartId),
                menuId: new ObjectId(menuId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
