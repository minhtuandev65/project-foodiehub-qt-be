import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { ResendProvider } from '~/providers/ResendProvider'
import assignRoleToUserTemplate from '~/template/clients/assignRoleToUserTemplate'
import ApiError from '~/utils/ApiError'

export const assignRoleToUser = async (reqData) => {
    const { email, role } = reqData

    const existUser = await authModels.findAccountByEmail(email)
    if (!existUser)
        throw new ApiError(StatusCodes.NOT_FOUND, 'Email not found!')
    if (!existUser.email)
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Email not activated')

    const userId = existUser._id
    const result = await authModels.updateNewRole(userId, role.toUpperCase())

    const assignRoleToUserMailTemplate = assignRoleToUserTemplate({ email })
    await ResendProvider.sendMail(
        email,
        'Role Assignment Successful',
        assignRoleToUserMailTemplate
    )

    return result
}
