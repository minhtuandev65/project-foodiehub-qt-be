import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { CANDIDATE_PROFILE_COLLECTION_NAME } from '~/helpers'

export const getDetailCandidateProfile = async (userId) => {
    try {
        const pipeline = [
            {
                $match: {
                    userId: new ObjectId(userId)
                }
            },
            {
                $project: {
                    email: 1,
                    age: 1,
                    address: 1,
                    phone: 1,
                    experience: 1,
                    candidatePosition: 1,
                    cvKeyS3: 1,
                    fullName: 1,
                    gender: 1,
                    status: 1,
                    skills: 1,
                    education: 1
                }
            }
        ]

        const candidateProfileDetail = await GET_DB()
            .collection(CANDIDATE_PROFILE_COLLECTION_NAME)
            .aggregate(pipeline)
            .toArray()

        return candidateProfileDetail[0] || null
    } catch (error) {
        throw new Error(error)
    }
}
