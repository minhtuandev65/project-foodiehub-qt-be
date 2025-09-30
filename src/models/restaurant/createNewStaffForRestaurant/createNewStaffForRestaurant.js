import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { RESTAURANT_COLLECTION_NAME } from '~/helpers'

export const createNewStaffForRestaurant = async (userId, restaurantId) => {
    try {
        const exist = await GET_DB()
            .collection(RESTAURANT_COLLECTION_NAME)
            .findOneAndUpdate(
                {
                    _id: new ObjectId(restaurantId),
                    _destroy: false,
                    isActive: true
                },
                {
                    $push: { staffId: new ObjectId(userId) },
                    $set: { updatedAt: new Date() }
                },
                { returnDocument: 'after' }
            )
        return exist.value
    } catch (error) {
        throw new Error(error)
    }
}
