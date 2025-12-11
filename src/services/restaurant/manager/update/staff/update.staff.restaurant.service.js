import { StatusCodes } from 'http-status-codes'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'

export const staff = async (updateData, t) => {
    const { staffId, ...rest } = updateData

    // 1) Tìm thực thể
    const exsitStaff = await models.staff.find.id(staffId)

    if (!exsitStaff) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy nhân viên')
    }

    const result = await models.staff.manager.update.staff(
        String(exsitStaff._id),
        ...rest
    )

    return result
}
