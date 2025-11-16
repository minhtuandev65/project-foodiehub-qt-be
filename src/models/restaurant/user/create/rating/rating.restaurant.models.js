/* model connect db */
import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const rating = async (dataRating) => {
    try {
        const valiData = await validations.beforeCreate.ratingRestaurant(dataRating)
        const dataToInsert = {
            ...valiData,
            userId: new ObjectId(valiData.userId),
            restaurantId: new ObjectId(valiData.restaurantId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.RATING_RESTAURANT)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
