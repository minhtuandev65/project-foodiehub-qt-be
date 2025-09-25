import { changePassword } from './changeNewPassword/changeNewPassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { uploadCVFile } from './users/upload/uploadCvFile/uploadCvFile'

export const clientsController = {
    getMyProfile,
    changePassword,
    uploadCVFile
}
