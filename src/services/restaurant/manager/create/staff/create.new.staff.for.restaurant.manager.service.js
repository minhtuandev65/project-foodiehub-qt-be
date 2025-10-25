import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { models } from '~/models'
import ApiError from '~/utils/ApiError'
import { ROLE } from '~/utils/constants'

export const staff = async (addNewStaff, t) => {
    const { restaurantId, email, managerEmail, ...rest } = addNewStaff

    // 1) Tìm thực thể
    const [existUserStaff, existUserManager, existRestaurant] =
        await Promise.all([
            models.auth.find.accountByEmail(email),
            models.auth.find.accountByEmail(managerEmail),
            models.restaurant.find.id(restaurantId)
        ])

    // 2) Validate tồn tại
    if (!existRestaurant) {
        throw new ApiError(StatusCodes.NOT_FOUND, t('restaurantNotFound'))
    }
    if (!existUserManager) {
        throw new ApiError(StatusCodes.NOT_FOUND, t('managerNotFound'))
    }

    // 3) So sánh ObjectId
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

    // 5) dùng transaction nếu DB hỗ trợ, tránh cập nhật role xong mà tạo staff fail
    const userId = existUserStaff._id

    const newStaff = {
        role: ROLE.STAFF,
        restaurantId: String(existRestaurant._id),
        staffId: String(userId),
        email: existUserStaff.email,
        ...rest
    }
    const result = await models.staff.manager.create.staff(newStaff)

    if (result) {
        await models.auth.update.updateNewRole(userId, ROLE.STAFF)
    }
    return result
}
