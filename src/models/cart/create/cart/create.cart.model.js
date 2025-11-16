/* model connect db */
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const carts = async (newCarts) => {
    try {
        const valiData = await validations.beforeCreate.carts(newCarts)
        const dataToInsert = {
            ...valiData,
            bookTableId: new ObjectId(valiData.bookTableId),
            userId: new ObjectId(valiData.userId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.CARTS)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
