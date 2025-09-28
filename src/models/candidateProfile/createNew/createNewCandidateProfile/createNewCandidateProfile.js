import { ObjectId } from 'mongodb'

import { GET_DB } from '~/config/mongodb'
import { CANDIDATE_PROFILE_COLLECTION_NAME } from '~/helpers'
import { validateBeforeCreateCandidateProfile } from '../../validateBeforeCreateCandidateProfile/validateBeforeCreateCandidateProfile'

export const createNewCandidateProfile = async (newCandidateProfile) => {
    try {
        const validData =
            await validateBeforeCreateCandidateProfile(newCandidateProfile)
        const organizationId = new ObjectId(validData.organizationId.trim())
        const dataToInsert = {
            ...validData,
            userId: new ObjectId(validData.userId),
            organizationId
        }
        const exist = GET_DB()
            .collection(CANDIDATE_PROFILE_COLLECTION_NAME)
            .insertOne(dataToInsert)
        return exist
    } catch (error) {
        throw new Error(error)
    }
}
