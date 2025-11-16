//model
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const restaurant = async (newRestaurant) => {
    try {
        const valiData =
            await validations.beforeCreate.restaurant(newRestaurant)
        const dataToInsert = {
            ...valiData,
            ownerId: new ObjectId(valiData.ownerId),
            createdAt: new Date()
        }
        const exist = await GET_DB()
            .collection(helpers.mongo.collectionName.RESTAURANTS)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
