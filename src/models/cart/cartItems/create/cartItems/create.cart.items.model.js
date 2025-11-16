/* model connect db */
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const cartItems = async (newCartItems) => {
    try {
        const valiData = await validations.beforeCreate.cartItems(newCartItems)
        const dataToInsert = {
            ...valiData,
            cartId: new ObjectId(valiData.cartId),
            menuId: new ObjectId(valiData.menuId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CART_ITEMS)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
