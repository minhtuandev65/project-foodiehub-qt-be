import { changePassword } from './changePassword/changePassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { getCvUser } from './managers/getCvUser/getCvUser'
import { updateMyProfile } from './update/updateMyProfile/updateMyProfile'
import { createNewCandidateProfile } from './users/createNew/createNewCandidateProfile/createNewCandidateProfile'

export const clientsServices = {
    getMyProfile,
    changePassword,
    createNewCandidateProfile,
    getCvUser,
    updateMyProfile
}
