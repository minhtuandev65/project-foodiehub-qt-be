import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { ResendProvider } from '~/providers/ResendProvider'
import assignRoleToUserTemplate from '~/template/clients/assignRoleToUserTemplate'
import ApiError from '~/utils/ApiError'

export const assignRoleToUser = async (reqData) => {
    try {
        const { email, role } = reqData
        const existUser = await authModels.findAccountByEmail(email)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Email not found!')
        if (!existUser.email)
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Email not activate')
        const userId = existUser._id

        const upperCaseRole = role.toUpperCase()
        const result = await authModels.updateNewRole(userId, upperCaseRole)
        const assignRoleToUserMailTemplate = assignRoleToUserTemplate({
            email
        })
        ResendProvider.sendMail(
            email,
            'Role Assignment Successful',
            assignRoleToUserMailTemplate
        )
        return result
    } catch (error) {
        throw Error(error)
    }
}
