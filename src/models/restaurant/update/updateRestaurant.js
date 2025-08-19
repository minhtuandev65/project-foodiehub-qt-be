import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import {
    INVALID_UPDATE_FIELDS_RESTAURANT,
    RESTAURANT_COLLECTION_NAME
} from '~/helpers'

export const updateRestaurant = async ({ restaurantId, newUpdateData }) => {
    try {
        Object.keys(newUpdateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS_RESTAURANT.includes(fieldName)) {
                delete newUpdateData[fieldName]
            }
        })
        const exist = GET_DB()
            .collection(RESTAURANT_COLLECTION_NAME)
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
