import { changePassword } from './changeNewPassword/changeNewPassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { getCvUser } from './managers/getCvUser/getCvUser'
import { uploadCVFile } from './users/upload/uploadCvFile/uploadCvFile'

export const clientsController = {
    getMyProfile,
    changePassword,
    uploadCVFile,
    getCvUser
}
