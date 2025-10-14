import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { USER_COLLECTION_NAME } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const getListUserForAdmin = async (filter = {}) => {
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
                    isActive: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $count: 'total' }]

        const [countResult] = await GET_DB()
            .collection(USER_COLLECTION_NAME)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const userList = await GET_DB()
            .collection(USER_COLLECTION_NAME)
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
