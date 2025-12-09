import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const listComment = async (filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30, restaurantId } = filter
        const skip = pagingSkipValue(page, limit)

        // --- MATCH CONDITION ---
        let matchStage = {
            _destroy: false
        }

        // Nếu có truyền restaurantId thì thêm vào match
        if (restaurantId) {
            matchStage.restaurantId = new ObjectId(restaurantId)
        }

        const pipeline = [
            { $match: matchStage },
            {
                $project: {
                    userId: 1,
                    restaurantId: 1,
                    comment: 1,
                    fullName: 1,
                    avatar: 1,
                    createdAt: 1,
                    commentId: 1

                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $match: matchStage }, { $count: 'total' }]


        const [countResult] = await GET_DB()
            .collection(helpers.mongo.collectionName.COMMENT_RESTAURANT)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const commentList = await GET_DB()
            .collection(helpers.mongo.collectionName.COMMENT_RESTAURANT)
            .aggregate(pipeline)
            .toArray()

        return {
            commentList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
