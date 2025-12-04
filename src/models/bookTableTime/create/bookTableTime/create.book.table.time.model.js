/* model connect db */
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const bookTableTime = async (newBookTableTime) => {
    try {
        const valiData =
            await validations.beforeCreate.bookTableTime(newBookTableTime)
        const dataToInsert = {
            ...valiData,
            tableId: new ObjectId(valiData.tableId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.BOOK_TABLE_TIME)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
