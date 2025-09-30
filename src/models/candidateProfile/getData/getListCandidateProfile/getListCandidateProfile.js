import { GET_DB } from '~/config/mongodb'
import { CANDIDATE_PROFILE_COLLECTION_NAME } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const getListCandidateProfile = async (filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)
        let matchStage = { _destroy: false, isActive: true }
        const pipeline = [
            { $match: matchStage },
            {
                $project: {
                    email: 1,
                    phone: 1,
                    fullName: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]

        const countPipeline = [{ $match: matchStage }, { $count: 'total' }]

        const [countResult] = await GET_DB()
            .collection(CANDIDATE_PROFILE_COLLECTION_NAME)
            .aggregate(countPipeline)
            .toArray()

        const total = countResult ? countResult.total : 0

        const restaurantList = await GET_DB()
            .collection(CANDIDATE_PROFILE_COLLECTION_NAME)
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
