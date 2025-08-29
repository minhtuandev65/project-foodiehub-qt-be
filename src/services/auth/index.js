import { activateUser } from './activateUser/activateUser'
import { authenticate } from './authenticate/authenticate'
import { createNewAccount } from './createNew/createNewAccount/createNewAccount'
import { forgotPassword } from './forgotPassword/forgotPassword'
import { getMyProfile } from '../clients/getMyProfile/getMyProfile'
import { refreshToken } from './refreshToken/refreshToken'
import { resetNewPassword } from './update/resetNewPassword/resetNewPassword'
import { verifyAccount } from './verifyAccount/verifyAccount'

export const authServices = {
    createNewAccount,
    authenticate,
    refreshToken,
    verifyAccount,
    activateUser,
    forgotPassword,
    resetNewPassword,
    getMyProfile
}
