import { changePassword } from './changeNewPassword/changeNewPassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { getListCandidateProfile } from './managers/getData/getListCandidateProfile/getListCandidateProfile'
import { getDetailCandidateProfile } from './managers/getData/getDetailCandidateProfile/getDetailCandidateProfile'
import { updateMyProfile } from './update/updateMyProfile/updateMyProfile'
import { createNewCandidateProfile } from './users/createNew/createNewCandidateProfile/createNewCandidateProfile'

export const clientsController = {
    getMyProfile,
    changePassword,
    createNewCandidateProfile,
    getDetailCandidateProfile,
    updateMyProfile,
    getListCandidateProfile
}
