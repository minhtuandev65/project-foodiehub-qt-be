import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'

export const staff = async (userId, restaurantId) => {
    try {
        const exist = await GET_DB()
            .collection(helpers.mongo.collectionName.RESTAURANTS)
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
