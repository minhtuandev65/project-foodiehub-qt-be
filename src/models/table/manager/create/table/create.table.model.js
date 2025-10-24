import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const table = async (newTable) => {
    try {
        const valiData = await validations.beforeCreate.table(newTable)
        const dataToInsert = {
            ...valiData,
            creatorId: new ObjectId(valiData.creatorId),
            restaurantId: new ObjectId(valiData.restaurantId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
