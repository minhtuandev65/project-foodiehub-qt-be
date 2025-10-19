import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { validations } from '~/validations'

export const staff = async (newStaff) => {
    try {
        const valiData = await validations.beforeCreate.staff(newStaff)
        const dataToInsert = {
            ...valiData,
            userId: new ObjectId(valiData.userId),
            restaurantId: new ObjectId(valiData.restaurantId),
            createdAt: new Date()
        }
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.STAFF)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
