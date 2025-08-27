import { StatusCodes } from 'http-status-codes'
import { authModels } from '~/models/auth'
import { organizationModel } from '~/models/organization/organizationModel'
import ApiError from '~/utils/ApiError'
import { ROLE } from '~/utils/constants'

export const addNewStaff = async (addNewStaff) => {
    try {
        const { organizationId, emailValue } = addNewStaff
        const existUser = await authModels.findByEmail(emailValue.email)
        if (!existUser)
            throw new ApiError(StatusCodes.NOT_FOUND, 'Email not found!')
        if (!existUser.email)
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Email not activate')
        const userId = existUser._id
        await authModels.pushNewRole(userId, ROLE.STAFF)
        const result = await organizationModel.createNewStaffOrganization({
            userId,
            organizationId
        })
        return result
    } catch (error) {
        throw Error(error)
    }
}
