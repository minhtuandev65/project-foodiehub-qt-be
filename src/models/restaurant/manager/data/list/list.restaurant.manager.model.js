import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const list = async (userId, filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)
        let matchStage = {
            _destroy: false,
            ownerId: new ObjectId(userId)
        }
        const pipeline = [
            { $match: matchStage },
            {
                $project: {
                    logoURL: 1,
                    name: 1,
                    address: 1,
                    createdAt: 1,
                    status: 1,
                    openTime: 1,
                    closeTime: 1,
                    openDays: 1,
                    isOpen: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $match: matchStage }, { $count: 'total' }]

        const [countResult] = await GET_DB()
            .collection(helpers.mongo.collectionName.RESTAURANTS)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const restaurantList = await GET_DB()
            .collection(helpers.mongo.collectionName.RESTAURANTS)
            .aggregate(pipeline)
            .toArray()

        return {
            restaurantList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
