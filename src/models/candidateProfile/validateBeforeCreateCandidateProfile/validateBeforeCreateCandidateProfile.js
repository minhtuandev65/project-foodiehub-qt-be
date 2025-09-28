import { CANDIDATE_PROFILE_COLLECTION_SCHEMA } from '../candidateProfileModel/candidateProfileModel'

export const validateBeforeCreateCandidateProfile = async (data) => {
    return await CANDIDATE_PROFILE_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}
