import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const list = async (filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)
        const pipeline = [
            {
                $project: {
                    logoURL: 1,
                    name: 1,
                    address: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $count: 'total' }]

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
