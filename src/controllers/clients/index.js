import { changePassword } from './changeNewPassword/changeNewPassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { getCvUser } from './managers/getCvUser/getCvUser'
import { updateMyProfile } from './update/updateMyProfile/updateMyProfile'
import { uploadCVFile } from './users/upload/uploadCvFile/uploadCvFile'

export const clientsController = {
    getMyProfile,
    changePassword,
    uploadCVFile,
    getCvUser,
    updateMyProfile
}
