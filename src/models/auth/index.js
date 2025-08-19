import { USER_COLLECTION_SCHEMA } from './authModel/authModel'
import { createNewAccount } from './createNewAccount/createNewAccount'
import { findAccountByEmail } from './findAccountByEmail/findAccountByEmail'
import { findAccountById } from './findAccountById/findAccountById'
import { getMyProfile } from './getMyProfile/getMyProfile'
import { updateLatestActiveEmail } from './update/updateLatestActive/updateLatestActive'
import { updateMyProfile } from './update/updateMyProfile/updateMyProfile'
import { updateNewRole } from './update/updateNewRole/updateNewRole'
import { validateBeforeCreateAuth } from './validateBeforeCreateAuth/validateBeforeCreateAuth'

export const authModels = {
    USER_COLLECTION_SCHEMA,
    validateBeforeCreateAuth,
    createNewAccount,
    findAccountByEmail,
    findAccountById,
    updateNewRole,
    getMyProfile,
    updateMyProfile,
    updateLatestActiveEmail
}
