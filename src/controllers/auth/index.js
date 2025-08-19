import { authenticate } from './authenticate/authenticate'
import { createNewAccount } from './createNewAccount/createNewAccount'
import { forgotPassword } from './forgotPassword/forgotPassword'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { logout } from './logout/logout'
import { refreshToken } from './refreshToken/refreshToken'
import { updateNewPassword } from './update/updateNewPassword/updateNewPassword'

export const authController = {
    createNewAccount,
    authenticate,
    logout,
    refreshToken,
    forgotPassword,
    updateNewPassword,
    getMyProfile
}
