import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { authModels } from '~/models/auth'
import { restaurantModels } from '~/models/clients/manager/restaurant'
import { staffModels } from '~/models/clients/manager/staff'

import ApiError from '~/utils/ApiError'
import { ROLE } from '~/utils/constants'

export const createNewStaffForRestaurant = async (addNewStaff, t) => {
    const { restaurantId, email, managerEmail, ...rest } = addNewStaff

    // 1) Tìm thực thể
    const [existUserStaff, existUserManager, existRestaurant] =
        await Promise.all([
            authModels.findAccountByEmail(email),
            authModels.findAccountByEmail(managerEmail),
            restaurantModels.findRestaurantById(restaurantId)
        ])

    // 2) Validate tồn tại
    if (!existRestaurant) {
        throw new ApiError(StatusCodes.NOT_FOUND, t('restaurantNotFound'))
    }
    if (!existUserManager) {
        throw new ApiError(StatusCodes.NOT_FOUND, t('managerNotFound'))
    }

    // 3) So sánh ObjectId đúng cách
    const rId = new ObjectId(restaurantId)
    const ownerId = new ObjectId(existRestaurant.ownerId)

    // Cách A: dùng .equals
    if (
        !existRestaurant._id.equals(rId) ||
        !ownerId.equals(existUserManager._id)
    ) {
        throw new ApiError(StatusCodes.NOT_FOUND, t('restaurantIsNotYours'))
    }

    // (Hoặc Cách B: so sánh chuỗi)
    // if (String(existRestaurant._id) !== restaurantId || String(existRestaurant.ownerId) !== String(existUserManager._id)) ...

    // 4) Các check còn lại
    if (!existUserStaff)
        throw new ApiError(StatusCodes.NOT_FOUND, t('user.emailNotFound'))

    if (existUserStaff.isActive === false)
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, t('user.emailNotActive'))

    if (existUserStaff.email === managerEmail)
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('managers.youCannotAddYourself')
        )

    if ([ROLE.MANAGER, ROLE.STAFF, ROLE.ADMIN].includes(existUserStaff.role))
        throw new ApiError(
            StatusCodes.NOT_ACCEPTABLE,
            t('managers.userCannotBeStaff', {
                email,
                role: existUserStaff.role
            })
        )

    // 5) (Khuyến nghị) dùng transaction nếu DB hỗ trợ, tránh cập nhật role xong mà tạo staff fail
    const userId = existUserStaff._id
    await authModels.updateNewRole(userId, ROLE.STAFF)

    const newStaff = {
        role: ROLE.STAFF,
        restaurantId: String(existRestaurant._id),
        userId: String(userId),
        email: existUserStaff.email,
        ...rest
    }
    return await staffModels.createNewStaff(newStaff)
}
