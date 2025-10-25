import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'

export const detail = async (restaurantId) => {
    try {
        const pipeline = [
            {
                $match: { _id: new ObjectId(restaurantId) }
            },
            {
                $project: {
                    logoURL: 1,
                    name: 1,
                    description: 1,
                    address: 1,
                    email: 1,
                    phone: 1,
                    lat: 1,
                    lng: 1,
                    openTime: 1,
                    closeTime: 1,
                    businessCertificateFileKey: 1,
                    businessCertificateImageKey: 1,
                    openDays: 1,
                    averageCostPerPerson: 1,
                    paymentMethods: 1,
                    isOpen: 1,
                    isPreOrderAvailable: 1,
                    ratingAverage: 1,
                    ratingQuantity: 1,
                    reviewCount: 1,
                    isEmployeeRecruitment: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    status: 1
                }
            }
        ]

        const restaurantDetail = await GET_DB()
            .collection(helpers.mongo.collectionName.RESTAURANTS)
            .aggregate(pipeline)
            .toArray()

        return restaurantDetail[0] || null
    } catch (error) {
        throw new Error(error)
    }
}
