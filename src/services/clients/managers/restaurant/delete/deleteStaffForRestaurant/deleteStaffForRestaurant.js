import { staffModels } from '~/models/clients/manager/staff'

export const deleteStaffForRestaurant = async (staffId, t) => {
    const existStaff = await staffModels.findStaffById(staffId)

    if (!existStaff)
        throw new ApiError(StatusCodes.NOT_FOUND, t('staff.staffNotFound'))
    console.log(existStaff)
    const newUpdateData = {
        _destroy: true
    }

    const result = await staffModels.updateStaff(
        String(existStaff.userId),
        newUpdateData
    )
    console.log('result', result)
    return result
}
