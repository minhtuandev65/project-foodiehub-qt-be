import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'

export const restaurant = async (restaurantId, newUpdateData) => {
    console.log("helpers.mongo.invalidFields =", helpers.mongo.invalidFields.INVALID_UPDATE_FIELDS_RESTAURANT)
    try {
        Object.keys(newUpdateData).forEach((fieldName) => {
            if (
                helpers.mongo.invalidFields.INVALID_UPDATE_FIELDS_RESTAURANT.includes(
                    fieldName
                )
            ) {
                delete newUpdateData[fieldName]
            }
        })
        const exist = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.RESTAURANTS)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(restaurantId),
                    _destroy: false
                },
                { $set: { ...newUpdateData, updatedAt: new Date() } },
                { returnDocument: 'after' }
            )
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
