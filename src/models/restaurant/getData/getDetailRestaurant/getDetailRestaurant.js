import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { RESTAURANT_COLLECTION_NAME } from '~/helpers'

export const getDetailRestaurant = async (restaurantId) => {
    try {
        const pipeline = [
            {
                $match: {
                    _destroy: false,
                    isActive: true,
                    _id: new ObjectId(restaurantId)
                }
            },
            {
                $project: {
                    logoURL: 1,
                    name: 1,
                    description: 1,
                    address: 1,
                    fullName: 1,
                    email: 1,
                    phone: 1,
                    lat: 1,
                    lng: 1,
                    openTime: 1,
                    closeTime: 1
                }
            }
        ]

        const restaurantDetail = await GET_DB()
            .collection(RESTAURANT_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()

        return restaurantDetail[0] || null
    } catch (error) {
        throw new Error(error)
    }
}
