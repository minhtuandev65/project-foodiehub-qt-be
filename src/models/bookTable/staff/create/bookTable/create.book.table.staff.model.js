/* model connect db */
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const bookTable = async (newBookTable) => {
    try {
        const valiData = await validations.beforeCreate.bookTable(newBookTable)
        const dataToInsert = {
            ...valiData,
            userId: new ObjectId(valiData.userId),
            restaurantId: new ObjectId(valiData.restaurantId),
            tableId: new ObjectId(valiData.tableId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.BOOK_TABLE)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
