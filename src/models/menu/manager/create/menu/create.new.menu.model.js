import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const menu = async (newMenu) => {
    try {
        const valiData = await validations.beforeCreate.menu(newMenu)
        const dataToInsert = {
            ...valiData,
            creatorId: new ObjectId(valiData.creatorId),
            restaurantId: new ObjectId(valiData.restaurantId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.MENU)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
