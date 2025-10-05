import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { RESTAURANT_COLLECTION_NAME } from '~/helpers'

export const findRestaurantById = async (restaurantId) => {
    try {
        const exist = GET_DB()
            .collection(RESTAURANT_COLLECTION_NAME)
            .findOne({
                _id: new ObjectId(restaurantId)
            })
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
