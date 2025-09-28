import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { CANDIDATE_PROFILE_COLLECTION_NAME } from '~/helpers'
import { pagingSkipValue } from '~/utils/algorithms'

export const getListCandidateProfile = async (restaurantId, filter = {}) => {
    try {
        const { sort, status, page = 1, limit = 30 } = filter
        const skip = pagingSkipValue(page, limit)

        const matchStage = {
            restaurantId: new ObjectId(restaurantId)
        }

        if (status) {
            matchStage.status = status.toUpperCase()
        }

        const pipeline = [
            { $match: matchStage },
            {
                $project: {
                    email: 1,
                    userId: 1,
                    fullName: 1,
                    createdAt: 1,
                    cvKeyS3: 1
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

        const candidateProfiles = await GET_DB()
            .collection(CANDIDATE_PROFILE_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()

        return {
            candidateProfiles,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    } catch (error) {
        throw new Error(error)
    }
}
