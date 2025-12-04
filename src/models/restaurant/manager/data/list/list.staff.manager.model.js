import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongo/mongodb'
import { helpers } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const listStaff = async (filter = {}) => {
    try {
        const { page = 1, limit = 30, restaurantId } = filter
        const skip = pagingSkipValue(page, limit)

        // --- MATCH CONDITION ---
        let matchStage = { _destroy: false }

        // Lọc theo restaurantId
        if (restaurantId) {
            matchStage.restaurantId = new ObjectId(restaurantId)
        }

        // Pipeline chính
        const pipeline = [
            { $match: matchStage },
            {
                $project: {
                    userId: 1,
                    restaurantId: 1,
                    email: 1,
                    workStartTime: 1,
                    workEndTime: 1,
                    workDays: 1,
                    avatar: 1,
                    gender: 1,
                    fullName: 1,
                    updatedAt: 1,
                    createdAt: 1,
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        // Đếm tổng
        const countPipeline = [{ $match: matchStage }, { $count: 'total' }]

        const [countResult] = await GET_DB()
            .collection(helpers.mongo.collectionName.STAFF)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult?.total || 0

        // Lấy danh sách staff
        const staffList = await GET_DB()
            .collection(helpers.mongo.collectionName.STAFF)
            .aggregate(pipeline)
            .toArray()

        return {
            staffList,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
