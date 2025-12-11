import { config } from '~/config'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const list = async (filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)

        const pipeline = [
            {
                $project: {
                    fullName: 1,
                    role: 1,
                    gender: 1,
                    createdAt: 1,
                    isActive: 1,
                    email: 1,
                    _destroy:1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $count: 'total' }]

        const [countResult] = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const userList = await config.mongo
            .GET_DB()
            .collection(helpers.mongo.collectionName.USERS)
            .aggregate(pipeline)
            .toArray()

        return {
            userList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
