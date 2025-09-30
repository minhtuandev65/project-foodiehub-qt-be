import { CANDIDATE_PROFILE_COLLECTION_SCHEMA } from './candidateProfileModel/candidateProfileModel'
import { createNewCandidateProfile } from './createNew/createNewCandidateProfile/createNewCandidateProfile'
import { getDetailCandidateProfile } from './getData/getDetailCandidateProfile/getDetailCandidateProfile'

export const candidateProfileModels = {
    CANDIDATE_PROFILE_COLLECTION_SCHEMA,
    createNewCandidateProfile,
    getDetailCandidateProfile
}
