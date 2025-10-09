import { changeNewPassword } from './changeNewPassword/changeNewPassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { getListCandidateProfile } from './managers/getData/getListCandidateProfile/getListCandidateProfile'
import { getDetailCandidateProfile } from './managers/getData/getDetailCandidateProfile/getDetailCandidateProfile'
import { updateProfileUser } from './update/updateProfileUser/updateProfileUser'
import { createNewCandidateProfile } from './users/createNew/createNewCandidateProfile/createNewCandidateProfile'

export const clientsController = {
    getMyProfile,
    changeNewPassword,
    createNewCandidateProfile,
    getDetailCandidateProfile,
    updateProfileUser,
    getListCandidateProfile
}
