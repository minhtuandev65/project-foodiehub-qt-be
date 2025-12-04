/* model connect db */
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const comment = async (dataComment) => {
    try {
        const valiData =
            await validations.beforeCreate.commentRestaurant(dataComment)
        const dataToInsert = {
            ...valiData,
            userId: new ObjectId(valiData.userId),
            restaurantId: new ObjectId(valiData.restaurantId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.COMMENT_RESTAURANT)
            .insertOne(dataToInsert)
        return dataToInsert
    } catch (error) {
        throw new Error(error)
    }
}
