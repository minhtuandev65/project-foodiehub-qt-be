import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const list = async (restaurantId, filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)

        const pipeline = [
            {
                $match: {
                    _destroy: false,
                    restaurantId: new ObjectId(restaurantId)
                }
            },
            {
                $project: { _id: 1, name: 1, status: 1 }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [
            {
                $match: {
                    _destroy: false,
                    restaurantId: new ObjectId(restaurantId)
                }
            },
            { $count: 'total' }
        ]

        const [countResult] = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const tableList = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.TABLE)
            .aggregate(pipeline)
            .toArray()

        return {
            tableList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
