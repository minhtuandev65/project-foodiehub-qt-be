import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'
import { ROLE } from '~/utils/constants'

export const staff = async (staffId, t) => {
    const existStaff = await models.staff.find.id(staffId)

    if (!existStaff)
        throw new ApiError(StatusCodes.NOT_FOUND, t('staff.staffNotFound'))

    const newUpdateData = {
        _destroy: true,
        role: ROLE.USER
    }

    const result = await models.staff.manager.update.staff(
        String(existStaff._id),
        newUpdateData
    )
    await models.auth.update.updateRoleUser(
        String(existStaff.userId),
        newUpdateData
    )
    return result
}
