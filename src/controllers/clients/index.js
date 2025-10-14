import { changeNewPassword } from './changeNewPassword/changeNewPassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { updateProfileUser } from './update/updateProfileUser/updateProfileUser'
import { createNewCandidateProfile } from './users/createNew/createNewCandidateProfile/createNewCandidateProfile'

export const clientsController = {
    getMyProfile,
    changeNewPassword,
    createNewCandidateProfile,
    updateProfileUser
}
