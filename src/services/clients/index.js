import { changePassword } from './changePassword/changePassword'
import { getMyProfile } from './getMyProfile/getMyProfile'

import { getDetailCandidateProfile } from './managers/getDetailCandidateProfile/getDetailCandidateProfile'
import { getListCandidateProfile } from './managers/getListCandidateProfile/getListCandidateProfile'
import { updateMyProfile } from './update/updateMyProfile/updateMyProfile'
import { createNewCandidateProfile } from './users/createNew/createNewCandidateProfile/createNewCandidateProfile'

export const clientsServices = {
    getMyProfile,
    changePassword,
    createNewCandidateProfile,
    getDetailCandidateProfile,
    updateMyProfile,
    getListCandidateProfile
}
