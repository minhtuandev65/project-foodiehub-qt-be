import { authenticate } from './authenticate/authenticate'
import { createNewAccount } from './createNewAccount/createNewAccount'
import { forgotPassword } from './forgotPassword/forgotPassword'
import { logout } from './logout/logout'
import { refreshToken } from './refreshToken/refreshToken'
import { resetNewPassword } from './update/resetNewPassword/resetNewPassword'
import { verifyAccount } from './verifyAccount/verifyAccount'

export const authController = {
    createNewAccount,
    authenticate,
    logout,
    refreshToken,
    forgotPassword,
    resetNewPassword,
    verifyAccount
}
