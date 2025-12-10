import { ObjectId } from 'mongodb'
import { config } from '~/config'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const list = async (userId, filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)
        let matchStage = {
            _destroy: false,
            userId: new ObjectId(userId)
        }
        const pipeline = [
            { $match: matchStage },
            {
                $project: {
                    date: 1,
                    startTime: 1,
                    endTime: 1,
                    status: 1,
                    bookOffline: 1,
                    restaurantId: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $match: matchStage }, { $count: 'total' }]

        const [countResult] = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.BOOK_TABLE)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const bookTableList = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.BOOK_TABLE)
            .aggregate(pipeline)
            .toArray()

        return {
            bookTableList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
