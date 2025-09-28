import { changePassword } from './changeNewPassword/changeNewPassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { getCandidateProfile } from './managers/getCandidateProfile/getCandidateProfile'
import { getCvUser } from './managers/getCvUser/getCvUser'
import { updateMyProfile } from './update/updateMyProfile/updateMyProfile'
import { createNewCandidateProfile } from './users/createNew/createNewCandidateProfile/createNewCandidateProfile'

export const clientsController = {
    getMyProfile,
    changePassword,
    createNewCandidateProfile,
    getCvUser,
    updateMyProfile,
    getCandidateProfile
}
