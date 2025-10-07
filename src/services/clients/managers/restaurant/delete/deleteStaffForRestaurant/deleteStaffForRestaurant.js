import { staffModels } from '~/models/clients/manager/staff'
import { ROLE } from '~/utils/constants'

export const deleteStaffForRestaurant = async (staffId, t) => {
    const existStaff = await staffModels.findStaffById(staffId)

    if (!existStaff)
        throw new ApiError(StatusCodes.NOT_FOUND, t('staff.staffNotFound'))
    
    const newUpdateData = {
        _destroy: true,
        role: ROLE.USER
    }

    const result = await staffModels.updateStaff(
        String(existStaff.userId),
        newUpdateData
    )
    
    return result
}
